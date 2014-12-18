#!/usr/bin/env python

"""
Functions specific to the gentrification project.
"""

import copytext
import app_config
from render_utils import flatten_app_config, JavascriptIncluder, CSSIncluder

def make_ca_context(ca, asset_depth=0):
    """
    Create a base-context for rendering views.
    Includes app_config and JS/CSS includers.

    `asset_depth` indicates how far into the url hierarchy
    the assets are hosted. If 0, then they are at the root.
    If 1 then at /foo/, etc.
    """
    context = flatten_app_config()

    copy = copytext.Copy(app_config.COPY_PATH)

    sheet = copy['community_area_data']

    community_area = ''

    for row in sheet:
    	if row['CA_number'] == ca:
    		community_area = row
    		break


    context['COPY'] = copytext.Copy(app_config.COPY_PATH)
    context['JS'] = JavascriptIncluder(asset_depth=asset_depth)
    context['CSS'] = CSSIncluder(asset_depth=asset_depth)
    context['CA'] = row
    return context