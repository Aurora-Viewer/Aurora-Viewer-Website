"""Write latest.json: the viewer's newest stable release, in the shape assets/js/site.js uses.

Same choice as summarise() in site.js: the newest release that is neither a draft nor a
pre-release and whose tag is "v<digit>" (media-plugins-* releases are skipped).
Usage: python3 latest_release.py <output file>. GH_TOKEN, when set, is sent to the API.
"""

import json
import os
import re
import sys
import urllib.request

REPO = "Aurora-Viewer/Aurora-Viewer"
API = f"https://api.github.com/repos/{REPO}"

# Crash symbols and checksums sit next to the archives: never offer those.
SKIP = re.compile(r"symbols|debug|\.(sha256|json|sig|asc)$", re.I)
SYSTEMS = {
    "windows": re.compile(r"windows.*\.(zip|msi|exe)$", re.I),
    "linux": re.compile(r"linux.*\.(tar\.(gz|xz|zst)|appimage|zip|deb|rpm)$", re.I),
    "macos": re.compile(r"macos.*\.dmg$", re.I),
}


def get(url):
    request = urllib.request.Request(url, headers={"Accept": "application/vnd.github+json"})
    token = os.environ.get("GH_TOKEN")
    if token:
        request.add_header("Authorization", f"Bearer {token}")
    with urllib.request.urlopen(request, timeout=30) as response:
        return json.load(response)


def summarise(releases):
    viewer = [r for r in releases
              if not r["draft"] and not r["prerelease"] and re.match(r"^v\d", r["tag_name"])]
    if not viewer:
        return None
    latest = max(viewer, key=lambda r: r["published_at"])

    def asset(pattern):
        found = next((a for a in latest["assets"]
                      if pattern.search(a["name"]) and not SKIP.search(a["name"])), None)
        if not found:
            return None
        checksum = next((a for a in latest["assets"] if a["name"] == f"{found['name']}.sha256"), None)
        return {
            "url": found["browser_download_url"],
            "size": found["size"],
            "name": found["name"],
            "sum": checksum["browser_download_url"] if checksum else "",
        }

    summary = {
        "version": latest["tag_name"][1:],
        "date": latest["published_at"],
        "url": latest["html_url"],
    }
    summary.update({system: asset(pattern) for system, pattern in SYSTEMS.items()})
    return summary


def main():
    release = summarise(get(f"{API}/releases?per_page=50")) or summarise([get(f"{API}/releases/latest")])
    if not release:
        sys.exit("No stable viewer release found")
    # A release whose binaries are still uploading is written at the next run.
    if not all(release[system] for system in SYSTEMS):
        print(f"v{release['version']} does not have its three downloads yet: latest.json is kept")
        return
    with open(sys.argv[1], "w", encoding="utf-8", newline="\n") as out:
        json.dump(release, out, indent=2)
        out.write("\n")
    print(f"v{release['version']}")


if __name__ == "__main__":
    main()
