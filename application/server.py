""" App entry point. """

from gatco import Gatco,CookieSessionInterface
from .config import Config

app = Gatco(name=__name__)
app.config.from_object(Config)
# app.session_interface = None
app.session_interface = CookieSessionInterface()


from application.database import init_database
from application.extensions import init_extensions
from application.controllers import init_controllers

static_endpoint = app.config.get("STATIC_URL", None)
if (static_endpoint is not None) and not ((static_endpoint.startswith( 'http://' ) or (static_endpoint.startswith( 'https://' )))):
    app.static(static_endpoint, './static')

init_database(app)
init_extensions(app)
init_controllers(app)
