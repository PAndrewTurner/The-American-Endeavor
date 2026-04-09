import http.server
import os
import sys

port = int(os.environ.get('PORT', 8080))
os.chdir('/Users/andrewturner/Documents/GitHub/The-American-Endeavor')
handler = http.server.SimpleHTTPRequestHandler
httpd = http.server.HTTPServer(('', port), handler)
print(f"Serving on port {port}")
sys.stdout.flush()
httpd.serve_forever()
