import requests
import json

IAU_METEOR_SHOWERS_DATA_URL = "https://www.ta3.sk/IAUC22DB/MDC2007/Etc/streamfulldata.txt"

r = requests.get(IAU_METEOR_SHOWERS_DATA_URL)
r.raise_for_status()

codes = set()
data = []

for l in r.text.splitlines():
  if not l: continue
  if l[0] == ":" or l[0] == "+": continue

  fs = l.split("|")
  def field(i):
    return fs[i].strip('" ')

  code = field(3)

  if code not in codes:
    codes.add(code)
    
    name = field(4)

    data.append({
      "code": code, 
      "name": name
    })
  
print(json.dumps(data, sort_keys=True, indent=4))
