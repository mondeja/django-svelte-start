from django.conf import settings
from django.contrib import admin
from django.urls import path, re_path
from django.views.generic import TemplateView
from django.views.static import serve


urlpatterns = [
    # Example view
    path(
        "",
        TemplateView.as_view(
            template_name="index.html",
            extra_context={"props": {"name": "Django + Svelte template"}},
        ),
        name="home",
    ),

    # Admin
    path("admin/", admin.site.urls),

    # Stylesheets
    re_path(
        r"^css/(?P<path>.*)$",
        serve,
        {
            "document_root": settings.BASE_DIR / "frontend" / "dist" / "css",
        },
    ),

    # Javascripts
    re_path(
        r"^js/(?P<path>.*)$",
        serve,
        {
            "document_root": settings.BASE_DIR / "frontend" / "dist" / "js",
        },
    ),

    # Images
    re_path(
        r"^img/(?P<path>.*)$",
        serve,
        {
            "document_root": settings.BASE_DIR / "frontend" / "dist" / "img",
        },
    ),
]
