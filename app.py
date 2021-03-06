#!/usr/bin/env python

import json

import argparse
from flask import Flask, make_response, render_template

import app_config
from render_utils import make_context, smarty_filter, urlencode_filter
import static

from gentrification import make_ca_context

app = Flask(__name__)

app.add_template_filter(smarty_filter, name='smarty')
app.add_template_filter(urlencode_filter, name='urlencode')

# Filters
def format_currency(value):
    value = int(value)
    return "${:,}".format(value)

def format_comma(value):
    value = int(value)
    return "{:,}".format(value)

app.jinja_env.filters['format_currency'] = format_currency
app.jinja_env.filters['format_comma'] = format_comma

# Example application views
@app.route('/')
def index():
    """
    Example view demonstrating rendering a simple HTML page.
    """
    context = make_context()

    with open('data/featured.json') as f:
        context['featured'] = json.load(f)

    return make_response(render_template('index.html', **context))

@app.route('/comments/')
def comments():
    """
    Full-page comments view.
    """
    return make_response(render_template('comments.html', **make_context()))


for num in range(1,78):
    @app.route('/widget/%s/' % num)
    def widget():
        """
        Embeddable widget example page.
        """
        from flask import request
        ca = request.path.split('/')[2]

        return make_response(render_template('widget.html', ca_num=ca,**make_ca_context(ca=ca)))

@app.route('/test_widget.html')
def test_widget():
    """
    Example page displaying widget at different embed sizes.
    """
    return make_response(render_template('test_widget.html', **make_context()))

app.register_blueprint(static.static)

# Boilerplate
if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('-p', '--port')
    args = parser.parse_args()
    server_port = 8000

    if args.port:
        server_port = int(args.port)

    app.run(host='0.0.0.0', port=server_port, debug=app_config.DEBUG)
