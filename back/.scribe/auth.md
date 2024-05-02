# Authenticating requests

To authenticate requests, include an **`Authorization`** header with the value **`"Bearer {YOUR_AUTH_KEY}"`**.

All authenticated endpoints are marked with a `requires authentication` badge in the documentation below.

<aside>***Important**** <br> Insertion of this Bearer token is done by our backend. When submitting a request the cookie is automatically attached to the request as a bearer token.</aside>
