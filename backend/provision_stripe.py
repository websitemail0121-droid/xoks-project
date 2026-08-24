import os, json, urllib.request

base = os.environ["INTEGRATION_PROXY_URL"]
job_id = "e3e88c3b-8ab0-416f-9559-d69eb906f401"
key = "sk-emergent-c5bF6D4521c8dC627D"

req = urllib.request.Request(
    base + "/stripe/sandboxes",
    data=json.dumps({"job_id": job_id}).encode(),
    headers={"Authorization": "Bearer " + key, "Content-Type": "application/json"},
    method="POST",
)
with urllib.request.urlopen(req) as r:
    sandbox = json.load(r)

print(json.dumps({
    "secret": sandbox["sandbox_secret_key"][:12] + "...",
    "publishable": sandbox["sandbox_publishable_key"][:12] + "...",
    "account_id": sandbox["sandbox_account_id"],
    "webhook_secret_present": bool(sandbox.get("preview_webhook_secret")),
    "onboarding_url": sandbox.get("onboarding_url"),
}, indent=2))

with open("/tmp/stripe_sandbox.json", "w") as f:
    json.dump(sandbox, f)
