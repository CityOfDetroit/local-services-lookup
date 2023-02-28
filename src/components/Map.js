'use strict';
import maplibregl from 'maplibre-gl';
import mapStyle from './style.json';
export default class Map extends HTMLElement {
    static get observedAttributes() {
        return ['data-map-state'];
    }

    constructor() {
        // Always call super first in constructor
        super();

        // Create a shadow root
        const shadow = this.attachShadow({ mode: 'open' });

        // Creating styles
        this.styles = document.createElement('style');

        this.styles.textContent = `
            #map-wrapper { position: relative; }
            #map { width:100%; min-height: 50em;}
            cod-button { position: absolute; bottom: 0; right: 0;}
            @media all and (min-width: 1024px) {
                cod-button { top: 0; left: 0; bottom: auto; right: auto;}
            }
        `;
        // Adding external styles to the shadow DOM by splitting https://unpkg.com/maplibre-gl@2.4.0/dist/maplibre-gl.css
        this.maplibreStyles1 = document.createElement("style");
        this.maplibreStyles1.textContent = `
        .mapboxgl-map,
        .maplibregl-map {
            -webkit-tap-highlight-color: rgb(0 0 0/0);
            font: 12px/20px Helvetica Neue, Arial, Helvetica, sans-serif;
            overflow: hidden;
            position: relative;
        }
        .mapboxgl-canvas,
        .maplibregl-canvas {
            left: 0;
            position: absolute;
            top: 0;
        }
        .mapboxgl-map:fullscreen,
        .maplibregl-map:fullscreen {
            height: 100%;
            width: 100%;
        }
        .mapboxgl-canvas-container.mapboxgl-interactive,
        .mapboxgl-ctrl-group button.mapboxgl-ctrl-compass,
        .maplibregl-canvas-container.maplibregl-interactive,
        .maplibregl-ctrl-group button.maplibregl-ctrl-compass {
            cursor: grab;
            -moz-user-select: none;
            -webkit-user-select: none;
            -ms-user-select: none;
            user-select: none;
        }
        .mapboxgl-canvas-container.mapboxgl-interactive.mapboxgl-track-pointer,
        .maplibregl-canvas-container.maplibregl-interactive.maplibregl-track-pointer {
            cursor: pointer;
        }
        .mapboxgl-canvas-container.mapboxgl-interactive:active,
        .mapboxgl-ctrl-group button.mapboxgl-ctrl-compass:active,
        .maplibregl-canvas-container.maplibregl-interactive:active,
        .maplibregl-ctrl-group button.maplibregl-ctrl-compass:active {
            cursor: grabbing;
        }
        .mapboxgl-canvas-container.mapboxgl-touch-zoom-rotate,
        .mapboxgl-canvas-container.mapboxgl-touch-zoom-rotate .mapboxgl-canvas,
        .maplibregl-canvas-container.maplibregl-touch-zoom-rotate,
        .maplibregl-canvas-container.maplibregl-touch-zoom-rotate .maplibregl-canvas {
            touch-action: pan-x pan-y;
        }
        .mapboxgl-canvas-container.mapboxgl-touch-drag-pan,
        .mapboxgl-canvas-container.mapboxgl-touch-drag-pan .mapboxgl-canvas,
        .maplibregl-canvas-container.maplibregl-touch-drag-pan,
        .maplibregl-canvas-container.maplibregl-touch-drag-pan .maplibregl-canvas {
            touch-action: pinch-zoom;
        }
        .mapboxgl-canvas-container.mapboxgl-touch-zoom-rotate.mapboxgl-touch-drag-pan,
        .mapboxgl-canvas-container.mapboxgl-touch-zoom-rotate.mapboxgl-touch-drag-pan .mapboxgl-canvas,
        .maplibregl-canvas-container.maplibregl-touch-zoom-rotate.maplibregl-touch-drag-pan,
        .maplibregl-canvas-container.maplibregl-touch-zoom-rotate.maplibregl-touch-drag-pan .maplibregl-canvas {
            touch-action: none;
        }
        .mapboxgl-ctrl-bottom-left,
        .mapboxgl-ctrl-bottom-right,
        .mapboxgl-ctrl-top-left,
        .mapboxgl-ctrl-top-right,
        .maplibregl-ctrl-bottom-left,
        .maplibregl-ctrl-bottom-right,
        .maplibregl-ctrl-top-left,
        .maplibregl-ctrl-top-right {
            pointer-events: none;
            position: absolute;
            z-index: 2;
        }
        .mapboxgl-ctrl-top-left,
        .maplibregl-ctrl-top-left {
            left: 0;
            top: 0;
        }
        .mapboxgl-ctrl-top-right,
        .maplibregl-ctrl-top-right {
            right: 0;
            top: 0;
        }
        .mapboxgl-ctrl-bottom-left,
        .maplibregl-ctrl-bottom-left {
            bottom: 0;
            left: 0;
        }
        .mapboxgl-ctrl-bottom-right,
        .maplibregl-ctrl-bottom-right {
            bottom: 0;
            right: 0;
        }
        .mapboxgl-ctrl,
        .maplibregl-ctrl {
            clear: both;
            pointer-events: auto;
            transform: translate(0);
        }
        .mapboxgl-ctrl-top-left .mapboxgl-ctrl,
        .maplibregl-ctrl-top-left .maplibregl-ctrl {
            float: left;
            margin: 10px 0 0 10px;
        }
        .mapboxgl-ctrl-top-right .mapboxgl-ctrl,
        .maplibregl-ctrl-top-right .maplibregl-ctrl {
            float: right;
            margin: 10px 10px 0 0;
        }
        .mapboxgl-ctrl-bottom-left .mapboxgl-ctrl,
        .maplibregl-ctrl-bottom-left .maplibregl-ctrl {
            float: left;
            margin: 0 0 10px 10px;
        }
        .mapboxgl-ctrl-bottom-right .mapboxgl-ctrl,
        .maplibregl-ctrl-bottom-right .maplibregl-ctrl {
            float: right;
            margin: 0 10px 10px 0;
        }
        .mapboxgl-ctrl-group,
        .maplibregl-ctrl-group {
            background: #fff;
            border-radius: 4px;
        }
        .mapboxgl-ctrl-group:not(:empty),
        .maplibregl-ctrl-group:not(:empty) {
            box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);
        }
        @media (-ms-high-contrast: active) {
            .mapboxgl-ctrl-group:not(:empty),
            .maplibregl-ctrl-group:not(:empty) {
                box-shadow: 0 0 0 2px ButtonText;
            }
        }
        .mapboxgl-ctrl-group button,
        .maplibregl-ctrl-group button {
            background-color: transparent;
            border: 0;
            box-sizing: border-box;
            cursor: pointer;
            display: block;
            height: 29px;
            outline: none;
            padding: 0;
            width: 29px;
        }
        .mapboxgl-ctrl-group button + button,
        .maplibregl-ctrl-group button + button {
            border-top: 1px solid #ddd;
        }
        .mapboxgl-ctrl button .mapboxgl-ctrl-icon,
        .maplibregl-ctrl button .maplibregl-ctrl-icon {
            background-position: 50%;
            background-repeat: no-repeat;
            display: block;
            height: 100%;
            width: 100%;
        }
        @media (-ms-high-contrast: active) {
            .mapboxgl-ctrl-icon,
            .maplibregl-ctrl-icon {
                background-color: transparent;
            }
            .mapboxgl-ctrl-group button + button,
            .maplibregl-ctrl-group button + button {
                border-top: 1px solid ButtonText;
            }
        }
        .mapboxgl-ctrl button::-moz-focus-inner,
        .maplibregl-ctrl button::-moz-focus-inner {
            border: 0;
            padding: 0;
        }
        .mapboxgl-ctrl-attrib-button:focus,
        .mapboxgl-ctrl-group button:focus,
        .maplibregl-ctrl-attrib-button:focus,
        .maplibregl-ctrl-group button:focus {
            box-shadow: 0 0 2px 2px #0096ff;
        }
        .mapboxgl-ctrl button:disabled,
        .maplibregl-ctrl button:disabled {
            cursor: not-allowed;
        }
        .mapboxgl-ctrl button:disabled .mapboxgl-ctrl-icon,
        .maplibregl-ctrl button:disabled .maplibregl-ctrl-icon {
            opacity: 0.25;
        }
        .mapboxgl-ctrl button:not(:disabled):hover,
        .maplibregl-ctrl button:not(:disabled):hover {
            background-color: rgb(0 0 0/5%);
        }
        .mapboxgl-ctrl-group button:focus:focus-visible,
        .maplibregl-ctrl-group button:focus:focus-visible {
            box-shadow: 0 0 2px 2px #0096ff;
        }
        .mapboxgl-ctrl-group button:focus:not(:focus-visible),
        .maplibregl-ctrl-group button:focus:not(:focus-visible) {
            box-shadow: none;
        }
        .mapboxgl-ctrl-group button:focus:first-child,
        .maplibregl-ctrl-group button:focus:first-child {
            border-radius: 4px 4px 0 0;
        }
        .mapboxgl-ctrl-group button:focus:last-child,
        .maplibregl-ctrl-group button:focus:last-child {
            border-radius: 0 0 4px 4px;
        }
        .mapboxgl-ctrl-group button:focus:only-child,
        .maplibregl-ctrl-group button:focus:only-child {
            border-radius: inherit;
        }
        `;

        this.maplibreStyles2 = document.createElement("style");
        this.maplibreStyles2.textContent = `
        .mapboxgl-ctrl button.mapboxgl-ctrl-zoom-out .mapboxgl-ctrl-icon,
.maplibregl-ctrl button.maplibregl-ctrl-zoom-out .maplibregl-ctrl-icon {
    background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg width='29' height='29' viewBox='0 0 29 29' xmlns='http://www.w3.org/2000/svg' fill='%23333'%3E%3Cpath d='M10 13c-.75 0-1.5.75-1.5 1.5S9.25 16 10 16h9c.75 0 1.5-.75 1.5-1.5S19.75 13 19 13h-9z'/%3E%3C/svg%3E");
}
.mapboxgl-ctrl button.mapboxgl-ctrl-zoom-in .mapboxgl-ctrl-icon,
.maplibregl-ctrl button.maplibregl-ctrl-zoom-in .maplibregl-ctrl-icon {
    background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg width='29' height='29' viewBox='0 0 29 29' xmlns='http://www.w3.org/2000/svg' fill='%23333'%3E%3Cpath d='M14.5 8.5c-.75 0-1.5.75-1.5 1.5v3h-3c-.75 0-1.5.75-1.5 1.5S9.25 16 10 16h3v3c0 .75.75 1.5 1.5 1.5S16 19.75 16 19v-3h3c.75 0 1.5-.75 1.5-1.5S19.75 13 19 13h-3v-3c0-.75-.75-1.5-1.5-1.5z'/%3E%3C/svg%3E");
}
@media (-ms-high-contrast: active) {
    .mapboxgl-ctrl button.mapboxgl-ctrl-zoom-out .mapboxgl-ctrl-icon,
    .maplibregl-ctrl button.maplibregl-ctrl-zoom-out .maplibregl-ctrl-icon {
        background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg width='29' height='29' viewBox='0 0 29 29' xmlns='http://www.w3.org/2000/svg' fill='%23fff'%3E%3Cpath d='M10 13c-.75 0-1.5.75-1.5 1.5S9.25 16 10 16h9c.75 0 1.5-.75 1.5-1.5S19.75 13 19 13h-9z'/%3E%3C/svg%3E");
    }
    .mapboxgl-ctrl button.mapboxgl-ctrl-zoom-in .mapboxgl-ctrl-icon,
    .maplibregl-ctrl button.maplibregl-ctrl-zoom-in .maplibregl-ctrl-icon {
        background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg width='29' height='29' viewBox='0 0 29 29' xmlns='http://www.w3.org/2000/svg' fill='%23fff'%3E%3Cpath d='M14.5 8.5c-.75 0-1.5.75-1.5 1.5v3h-3c-.75 0-1.5.75-1.5 1.5S9.25 16 10 16h3v3c0 .75.75 1.5 1.5 1.5S16 19.75 16 19v-3h3c.75 0 1.5-.75 1.5-1.5S19.75 13 19 13h-3v-3c0-.75-.75-1.5-1.5-1.5z'/%3E%3C/svg%3E");
    }
}
@media (-ms-high-contrast: black-on-white) {
    .mapboxgl-ctrl button.mapboxgl-ctrl-zoom-out .mapboxgl-ctrl-icon,
    .maplibregl-ctrl button.maplibregl-ctrl-zoom-out .maplibregl-ctrl-icon {
        background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg width='29' height='29' viewBox='0 0 29 29' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 13c-.75 0-1.5.75-1.5 1.5S9.25 16 10 16h9c.75 0 1.5-.75 1.5-1.5S19.75 13 19 13h-9z'/%3E%3C/svg%3E");
    }
    .mapboxgl-ctrl button.mapboxgl-ctrl-zoom-in .mapboxgl-ctrl-icon,
    .maplibregl-ctrl button.maplibregl-ctrl-zoom-in .maplibregl-ctrl-icon {
        background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg width='29' height='29' viewBox='0 0 29 29' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M14.5 8.5c-.75 0-1.5.75-1.5 1.5v3h-3c-.75 0-1.5.75-1.5 1.5S9.25 16 10 16h3v3c0 .75.75 1.5 1.5 1.5S16 19.75 16 19v-3h3c.75 0 1.5-.75 1.5-1.5S19.75 13 19 13h-3v-3c0-.75-.75-1.5-1.5-1.5z'/%3E%3C/svg%3E");
    }
}
.mapboxgl-ctrl button.mapboxgl-ctrl-fullscreen .mapboxgl-ctrl-icon,
.maplibregl-ctrl button.maplibregl-ctrl-fullscreen .maplibregl-ctrl-icon {
    background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg width='29' height='29' viewBox='0 0 29 29' xmlns='http://www.w3.org/2000/svg' fill='%23333'%3E%3Cpath d='M24 16v5.5c0 1.75-.75 2.5-2.5 2.5H16v-1l3-1.5-4-5.5 1-1 5.5 4 1.5-3h1zM6 16l1.5 3 5.5-4 1 1-4 5.5 3 1.5v1H7.5C5.75 24 5 23.25 5 21.5V16h1zm7-11v1l-3 1.5 4 5.5-1 1-5.5-4L6 13H5V7.5C5 5.75 5.75 5 7.5 5H13zm11 2.5c0-1.75-.75-2.5-2.5-2.5H16v1l3 1.5-4 5.5 1 1 5.5-4 1.5 3h1V7.5z'/%3E%3C/svg%3E");
}
.mapboxgl-ctrl button.mapboxgl-ctrl-shrink .mapboxgl-ctrl-icon,
.maplibregl-ctrl button.maplibregl-ctrl-shrink .maplibregl-ctrl-icon {
    background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg width='29' height='29' viewBox='0 0 29 29' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M18.5 16c-1.75 0-2.5.75-2.5 2.5V24h1l1.5-3 5.5 4 1-1-4-5.5 3-1.5v-1h-5.5zM13 18.5c0-1.75-.75-2.5-2.5-2.5H5v1l3 1.5L4 24l1 1 5.5-4 1.5 3h1v-5.5zm3-8c0 1.75.75 2.5 2.5 2.5H24v-1l-3-1.5L25 5l-1-1-5.5 4L17 5h-1v5.5zM10.5 13c1.75 0 2.5-.75 2.5-2.5V5h-1l-1.5 3L5 4 4 5l4 5.5L5 12v1h5.5z'/%3E%3C/svg%3E");
}
@media (-ms-high-contrast: active) {
    .mapboxgl-ctrl button.mapboxgl-ctrl-fullscreen .mapboxgl-ctrl-icon,
    .maplibregl-ctrl button.maplibregl-ctrl-fullscreen .maplibregl-ctrl-icon {
        background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg width='29' height='29' viewBox='0 0 29 29' xmlns='http://www.w3.org/2000/svg' fill='%23fff'%3E%3Cpath d='M24 16v5.5c0 1.75-.75 2.5-2.5 2.5H16v-1l3-1.5-4-5.5 1-1 5.5 4 1.5-3h1zM6 16l1.5 3 5.5-4 1 1-4 5.5 3 1.5v1H7.5C5.75 24 5 23.25 5 21.5V16h1zm7-11v1l-3 1.5 4 5.5-1 1-5.5-4L6 13H5V7.5C5 5.75 5.75 5 7.5 5H13zm11 2.5c0-1.75-.75-2.5-2.5-2.5H16v1l3 1.5-4 5.5 1 1 5.5-4 1.5 3h1V7.5z'/%3E%3C/svg%3E");
    }
    .mapboxgl-ctrl button.mapboxgl-ctrl-shrink .mapboxgl-ctrl-icon,
    .maplibregl-ctrl button.maplibregl-ctrl-shrink .maplibregl-ctrl-icon {
        background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg width='29' height='29' viewBox='0 0 29 29' xmlns='http://www.w3.org/2000/svg' fill='%23fff'%3E%3Cpath d='M18.5 16c-1.75 0-2.5.75-2.5 2.5V24h1l1.5-3 5.5 4 1-1-4-5.5 3-1.5v-1h-5.5zM13 18.5c0-1.75-.75-2.5-2.5-2.5H5v1l3 1.5L4 24l1 1 5.5-4 1.5 3h1v-5.5zm3-8c0 1.75.75 2.5 2.5 2.5H24v-1l-3-1.5L25 5l-1-1-5.5 4L17 5h-1v5.5zM10.5 13c1.75 0 2.5-.75 2.5-2.5V5h-1l-1.5 3L5 4 4 5l4 5.5L5 12v1h5.5z'/%3E%3C/svg%3E");
    }
}
@media (-ms-high-contrast: black-on-white) {
    .mapboxgl-ctrl button.mapboxgl-ctrl-fullscreen .mapboxgl-ctrl-icon,
    .maplibregl-ctrl button.maplibregl-ctrl-fullscreen .maplibregl-ctrl-icon {
        background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg width='29' height='29' viewBox='0 0 29 29' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M24 16v5.5c0 1.75-.75 2.5-2.5 2.5H16v-1l3-1.5-4-5.5 1-1 5.5 4 1.5-3h1zM6 16l1.5 3 5.5-4 1 1-4 5.5 3 1.5v1H7.5C5.75 24 5 23.25 5 21.5V16h1zm7-11v1l-3 1.5 4 5.5-1 1-5.5-4L6 13H5V7.5C5 5.75 5.75 5 7.5 5H13zm11 2.5c0-1.75-.75-2.5-2.5-2.5H16v1l3 1.5-4 5.5 1 1 5.5-4 1.5 3h1V7.5z'/%3E%3C/svg%3E");
    }
    .mapboxgl-ctrl button.mapboxgl-ctrl-shrink .mapboxgl-ctrl-icon,
    .maplibregl-ctrl button.maplibregl-ctrl-shrink .maplibregl-ctrl-icon {
        background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg width='29' height='29' viewBox='0 0 29 29' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M18.5 16c-1.75 0-2.5.75-2.5 2.5V24h1l1.5-3 5.5 4 1-1-4-5.5 3-1.5v-1h-5.5zM13 18.5c0-1.75-.75-2.5-2.5-2.5H5v1l3 1.5L4 24l1 1 5.5-4 1.5 3h1v-5.5zm3-8c0 1.75.75 2.5 2.5 2.5H24v-1l-3-1.5L25 5l-1-1-5.5 4L17 5h-1v5.5zM10.5 13c1.75 0 2.5-.75 2.5-2.5V5h-1l-1.5 3L5 4 4 5l4 5.5L5 12v1h5.5z'/%3E%3C/svg%3E");
    }
}
.mapboxgl-ctrl button.mapboxgl-ctrl-compass .mapboxgl-ctrl-icon,
.maplibregl-ctrl button.maplibregl-ctrl-compass .maplibregl-ctrl-icon {
    background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg width='29' height='29' viewBox='0 0 29 29' xmlns='http://www.w3.org/2000/svg' fill='%23333'%3E%3Cpath d='m10.5 14 4-8 4 8h-8z'/%3E%3Cpath d='m10.5 16 4 8 4-8h-8z' fill='%23ccc'/%3E%3C/svg%3E");
}
@media (-ms-high-contrast: active) {
    .mapboxgl-ctrl button.mapboxgl-ctrl-compass .mapboxgl-ctrl-icon,
    .maplibregl-ctrl button.maplibregl-ctrl-compass .maplibregl-ctrl-icon {
        background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg width='29' height='29' viewBox='0 0 29 29' xmlns='http://www.w3.org/2000/svg' fill='%23fff'%3E%3Cpath d='m10.5 14 4-8 4 8h-8z'/%3E%3Cpath d='m10.5 16 4 8 4-8h-8z' fill='%23999'/%3E%3C/svg%3E");
    }
}
@media (-ms-high-contrast: black-on-white) {
    .mapboxgl-ctrl button.mapboxgl-ctrl-compass .mapboxgl-ctrl-icon,
    .maplibregl-ctrl button.maplibregl-ctrl-compass .maplibregl-ctrl-icon {
        background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg width='29' height='29' viewBox='0 0 29 29' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='m10.5 14 4-8 4 8h-8z'/%3E%3Cpath d='m10.5 16 4 8 4-8h-8z' fill='%23ccc'/%3E%3C/svg%3E");
    }
}
.mapboxgl-ctrl button.mapboxgl-ctrl-terrain .mapboxgl-ctrl-icon,
.maplibregl-ctrl button.maplibregl-ctrl-terrain .maplibregl-ctrl-icon {
    background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='22' height='22' viewBox='0 0 22 22' fill='%23333'%3E%3Cpath d='m1.754 13.406 4.453-4.851 3.09 3.09 3.281 3.277.969-.969-3.309-3.312 3.844-4.121 6.148 6.886h1.082v-.855l-7.207-8.07-4.84 5.187L6.169 6.57l-5.48 5.965v.871ZM.688 16.844h20.625v1.375H.688Zm0 0'/%3E%3C/svg%3E");
}
.mapboxgl-ctrl button.mapboxgl-ctrl-terrain-enabled .mapboxgl-ctrl-icon,
.maplibregl-ctrl button.maplibregl-ctrl-terrain-enabled .maplibregl-ctrl-icon {
    background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='22' height='22' viewBox='0 0 22 22' fill='%2333b5e5'%3E%3Cpath d='m1.754 13.406 4.453-4.851 3.09 3.09 3.281 3.277.969-.969-3.309-3.312 3.844-4.121 6.148 6.886h1.082v-.855l-7.207-8.07-4.84 5.187L6.169 6.57l-5.48 5.965v.871ZM.688 16.844h20.625v1.375H.688Zm0 0'/%3E%3C/svg%3E");
}
.mapboxgl-ctrl button.mapboxgl-ctrl-geolocate .mapboxgl-ctrl-icon,
.maplibregl-ctrl button.maplibregl-ctrl-geolocate .maplibregl-ctrl-icon {
    background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg width='29' height='29' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg' fill='%23333'%3E%3Cpath d='M10 4C9 4 9 5 9 5v.1A5 5 0 0 0 5.1 9H5s-1 0-1 1 1 1 1 1h.1A5 5 0 0 0 9 14.9v.1s0 1 1 1 1-1 1-1v-.1a5 5 0 0 0 3.9-3.9h.1s1 0 1-1-1-1-1-1h-.1A5 5 0 0 0 11 5.1V5s0-1-1-1zm0 2.5a3.5 3.5 0 1 1 0 7 3.5 3.5 0 1 1 0-7z'/%3E%3Ccircle cx='10' cy='10' r='2'/%3E%3C/svg%3E");
}
.mapboxgl-ctrl button.mapboxgl-ctrl-geolocate:disabled .mapboxgl-ctrl-icon,
.maplibregl-ctrl button.maplibregl-ctrl-geolocate:disabled .maplibregl-ctrl-icon {
    background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg width='29' height='29' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg' fill='%23aaa'%3E%3Cpath d='M10 4C9 4 9 5 9 5v.1A5 5 0 0 0 5.1 9H5s-1 0-1 1 1 1 1 1h.1A5 5 0 0 0 9 14.9v.1s0 1 1 1 1-1 1-1v-.1a5 5 0 0 0 3.9-3.9h.1s1 0 1-1-1-1-1-1h-.1A5 5 0 0 0 11 5.1V5s0-1-1-1zm0 2.5a3.5 3.5 0 1 1 0 7 3.5 3.5 0 1 1 0-7z'/%3E%3Ccircle cx='10' cy='10' r='2'/%3E%3Cpath d='m14 5 1 1-9 9-1-1 9-9z' fill='red'/%3E%3C/svg%3E");
}
.mapboxgl-ctrl button.mapboxgl-ctrl-geolocate.mapboxgl-ctrl-geolocate-active .mapboxgl-ctrl-icon,
.maplibregl-ctrl button.maplibregl-ctrl-geolocate.maplibregl-ctrl-geolocate-active .maplibregl-ctrl-icon {
    background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg width='29' height='29' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg' fill='%2333b5e5'%3E%3Cpath d='M10 4C9 4 9 5 9 5v.1A5 5 0 0 0 5.1 9H5s-1 0-1 1 1 1 1 1h.1A5 5 0 0 0 9 14.9v.1s0 1 1 1 1-1 1-1v-.1a5 5 0 0 0 3.9-3.9h.1s1 0 1-1-1-1-1-1h-.1A5 5 0 0 0 11 5.1V5s0-1-1-1zm0 2.5a3.5 3.5 0 1 1 0 7 3.5 3.5 0 1 1 0-7z'/%3E%3Ccircle cx='10' cy='10' r='2'/%3E%3C/svg%3E");
}
.mapboxgl-ctrl button.mapboxgl-ctrl-geolocate.mapboxgl-ctrl-geolocate-active-error .mapboxgl-ctrl-icon,
.maplibregl-ctrl button.maplibregl-ctrl-geolocate.maplibregl-ctrl-geolocate-active-error .maplibregl-ctrl-icon {
    background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg width='29' height='29' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg' fill='%23e58978'%3E%3Cpath d='M10 4C9 4 9 5 9 5v.1A5 5 0 0 0 5.1 9H5s-1 0-1 1 1 1 1 1h.1A5 5 0 0 0 9 14.9v.1s0 1 1 1 1-1 1-1v-.1a5 5 0 0 0 3.9-3.9h.1s1 0 1-1-1-1-1-1h-.1A5 5 0 0 0 11 5.1V5s0-1-1-1zm0 2.5a3.5 3.5 0 1 1 0 7 3.5 3.5 0 1 1 0-7z'/%3E%3Ccircle cx='10' cy='10' r='2'/%3E%3C/svg%3E");
}
.mapboxgl-ctrl button.mapboxgl-ctrl-geolocate.mapboxgl-ctrl-geolocate-background .mapboxgl-ctrl-icon,
.maplibregl-ctrl button.maplibregl-ctrl-geolocate.maplibregl-ctrl-geolocate-background .maplibregl-ctrl-icon {
    background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg width='29' height='29' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg' fill='%2333b5e5'%3E%3Cpath d='M10 4C9 4 9 5 9 5v.1A5 5 0 0 0 5.1 9H5s-1 0-1 1 1 1 1 1h.1A5 5 0 0 0 9 14.9v.1s0 1 1 1 1-1 1-1v-.1a5 5 0 0 0 3.9-3.9h.1s1 0 1-1-1-1-1-1h-.1A5 5 0 0 0 11 5.1V5s0-1-1-1zm0 2.5a3.5 3.5 0 1 1 0 7 3.5 3.5 0 1 1 0-7z'/%3E%3C/svg%3E");
}
.mapboxgl-ctrl button.mapboxgl-ctrl-geolocate.mapboxgl-ctrl-geolocate-background-error .mapboxgl-ctrl-icon,
.maplibregl-ctrl button.maplibregl-ctrl-geolocate.maplibregl-ctrl-geolocate-background-error .maplibregl-ctrl-icon {
    background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg width='29' height='29' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg' fill='%23e54e33'%3E%3Cpath d='M10 4C9 4 9 5 9 5v.1A5 5 0 0 0 5.1 9H5s-1 0-1 1 1 1 1 1h.1A5 5 0 0 0 9 14.9v.1s0 1 1 1 1-1 1-1v-.1a5 5 0 0 0 3.9-3.9h.1s1 0 1-1-1-1-1-1h-.1A5 5 0 0 0 11 5.1V5s0-1-1-1zm0 2.5a3.5 3.5 0 1 1 0 7 3.5 3.5 0 1 1 0-7z'/%3E%3C/svg%3E");
}
.mapboxgl-ctrl button.mapboxgl-ctrl-geolocate.mapboxgl-ctrl-geolocate-waiting .mapboxgl-ctrl-icon,
.maplibregl-ctrl button.maplibregl-ctrl-geolocate.maplibregl-ctrl-geolocate-waiting .maplibregl-ctrl-icon {
    animation: maplibregl-spin 2s linear infinite;
}
@media (-ms-high-contrast: active) {
    .mapboxgl-ctrl button.mapboxgl-ctrl-geolocate .mapboxgl-ctrl-icon,
    .maplibregl-ctrl button.maplibregl-ctrl-geolocate .maplibregl-ctrl-icon {
        background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg width='29' height='29' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg' fill='%23fff'%3E%3Cpath d='M10 4C9 4 9 5 9 5v.1A5 5 0 0 0 5.1 9H5s-1 0-1 1 1 1 1 1h.1A5 5 0 0 0 9 14.9v.1s0 1 1 1 1-1 1-1v-.1a5 5 0 0 0 3.9-3.9h.1s1 0 1-1-1-1-1-1h-.1A5 5 0 0 0 11 5.1V5s0-1-1-1zm0 2.5a3.5 3.5 0 1 1 0 7 3.5 3.5 0 1 1 0-7z'/%3E%3Ccircle cx='10' cy='10' r='2'/%3E%3C/svg%3E");
    }
    .mapboxgl-ctrl button.mapboxgl-ctrl-geolocate:disabled .mapboxgl-ctrl-icon,
    .maplibregl-ctrl button.maplibregl-ctrl-geolocate:disabled .maplibregl-ctrl-icon {
        background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg width='29' height='29' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg' fill='%23999'%3E%3Cpath d='M10 4C9 4 9 5 9 5v.1A5 5 0 0 0 5.1 9H5s-1 0-1 1 1 1 1 1h.1A5 5 0 0 0 9 14.9v.1s0 1 1 1 1-1 1-1v-.1a5 5 0 0 0 3.9-3.9h.1s1 0 1-1-1-1-1-1h-.1A5 5 0 0 0 11 5.1V5s0-1-1-1zm0 2.5a3.5 3.5 0 1 1 0 7 3.5 3.5 0 1 1 0-7z'/%3E%3Ccircle cx='10' cy='10' r='2'/%3E%3Cpath d='m14 5 1 1-9 9-1-1 9-9z' fill='red'/%3E%3C/svg%3E");
    }
    .mapboxgl-ctrl button.mapboxgl-ctrl-geolocate.mapboxgl-ctrl-geolocate-active .mapboxgl-ctrl-icon,
    .maplibregl-ctrl button.maplibregl-ctrl-geolocate.maplibregl-ctrl-geolocate-active .maplibregl-ctrl-icon {
        background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg width='29' height='29' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg' fill='%2333b5e5'%3E%3Cpath d='M10 4C9 4 9 5 9 5v.1A5 5 0 0 0 5.1 9H5s-1 0-1 1 1 1 1 1h.1A5 5 0 0 0 9 14.9v.1s0 1 1 1 1-1 1-1v-.1a5 5 0 0 0 3.9-3.9h.1s1 0 1-1-1-1-1-1h-.1A5 5 0 0 0 11 5.1V5s0-1-1-1zm0 2.5a3.5 3.5 0 1 1 0 7 3.5 3.5 0 1 1 0-7z'/%3E%3Ccircle cx='10' cy='10' r='2'/%3E%3C/svg%3E");
    }
    .mapboxgl-ctrl button.mapboxgl-ctrl-geolocate.mapboxgl-ctrl-geolocate-active-error .mapboxgl-ctrl-icon,
    .maplibregl-ctrl button.maplibregl-ctrl-geolocate.maplibregl-ctrl-geolocate-active-error .maplibregl-ctrl-icon {
        background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg width='29' height='29' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg' fill='%23e58978'%3E%3Cpath d='M10 4C9 4 9 5 9 5v.1A5 5 0 0 0 5.1 9H5s-1 0-1 1 1 1 1 1h.1A5 5 0 0 0 9 14.9v.1s0 1 1 1 1-1 1-1v-.1a5 5 0 0 0 3.9-3.9h.1s1 0 1-1-1-1-1-1h-.1A5 5 0 0 0 11 5.1V5s0-1-1-1zm0 2.5a3.5 3.5 0 1 1 0 7 3.5 3.5 0 1 1 0-7z'/%3E%3Ccircle cx='10' cy='10' r='2'/%3E%3C/svg%3E");
    }
    .mapboxgl-ctrl button.mapboxgl-ctrl-geolocate.mapboxgl-ctrl-geolocate-background .mapboxgl-ctrl-icon,
    .maplibregl-ctrl button.maplibregl-ctrl-geolocate.maplibregl-ctrl-geolocate-background .maplibregl-ctrl-icon {
        background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg width='29' height='29' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg' fill='%2333b5e5'%3E%3Cpath d='M10 4C9 4 9 5 9 5v.1A5 5 0 0 0 5.1 9H5s-1 0-1 1 1 1 1 1h.1A5 5 0 0 0 9 14.9v.1s0 1 1 1 1-1 1-1v-.1a5 5 0 0 0 3.9-3.9h.1s1 0 1-1-1-1-1-1h-.1A5 5 0 0 0 11 5.1V5s0-1-1-1zm0 2.5a3.5 3.5 0 1 1 0 7 3.5 3.5 0 1 1 0-7z'/%3E%3C/svg%3E");
    }
    .mapboxgl-ctrl button.mapboxgl-ctrl-geolocate.mapboxgl-ctrl-geolocate-background-error .mapboxgl-ctrl-icon,
    .maplibregl-ctrl button.maplibregl-ctrl-geolocate.maplibregl-ctrl-geolocate-background-error .maplibregl-ctrl-icon {
        background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg width='29' height='29' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg' fill='%23e54e33'%3E%3Cpath d='M10 4C9 4 9 5 9 5v.1A5 5 0 0 0 5.1 9H5s-1 0-1 1 1 1 1 1h.1A5 5 0 0 0 9 14.9v.1s0 1 1 1 1-1 1-1v-.1a5 5 0 0 0 3.9-3.9h.1s1 0 1-1-1-1-1-1h-.1A5 5 0 0 0 11 5.1V5s0-1-1-1zm0 2.5a3.5 3.5 0 1 1 0 7 3.5 3.5 0 1 1 0-7z'/%3E%3C/svg%3E");
    }
}
@media (-ms-high-contrast: black-on-white) {
    .mapboxgl-ctrl button.mapboxgl-ctrl-geolocate .mapboxgl-ctrl-icon,
    .maplibregl-ctrl button.maplibregl-ctrl-geolocate .maplibregl-ctrl-icon {
        background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg width='29' height='29' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 4C9 4 9 5 9 5v.1A5 5 0 0 0 5.1 9H5s-1 0-1 1 1 1 1 1h.1A5 5 0 0 0 9 14.9v.1s0 1 1 1 1-1 1-1v-.1a5 5 0 0 0 3.9-3.9h.1s1 0 1-1-1-1-1-1h-.1A5 5 0 0 0 11 5.1V5s0-1-1-1zm0 2.5a3.5 3.5 0 1 1 0 7 3.5 3.5 0 1 1 0-7z'/%3E%3Ccircle cx='10' cy='10' r='2'/%3E%3C/svg%3E");
    }
    .mapboxgl-ctrl button.mapboxgl-ctrl-geolocate:disabled .mapboxgl-ctrl-icon,
    .maplibregl-ctrl button.maplibregl-ctrl-geolocate:disabled .maplibregl-ctrl-icon {
        background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg width='29' height='29' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg' fill='%23666'%3E%3Cpath d='M10 4C9 4 9 5 9 5v.1A5 5 0 0 0 5.1 9H5s-1 0-1 1 1 1 1 1h.1A5 5 0 0 0 9 14.9v.1s0 1 1 1 1-1 1-1v-.1a5 5 0 0 0 3.9-3.9h.1s1 0 1-1-1-1-1-1h-.1A5 5 0 0 0 11 5.1V5s0-1-1-1zm0 2.5a3.5 3.5 0 1 1 0 7 3.5 3.5 0 1 1 0-7z'/%3E%3Ccircle cx='10' cy='10' r='2'/%3E%3Cpath d='m14 5 1 1-9 9-1-1 9-9z' fill='red'/%3E%3C/svg%3E");
    }
}
        `;

        this.maplibreStyles3 = document.createElement("style");
        this.maplibreStyles3.textContent = `
        @keyframes maplibregl-spin {
            0% {
                transform: rotate(0deg);
            }
            to {
                transform: rotate(1turn);
            }
        }
        a.mapboxgl-ctrl-logo,
        a.maplibregl-ctrl-logo {
            background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='88' height='23' fill='none'%3E%3Cpath d='M17.408 16.796h-1.827l2.501-12.095h.198l3.324 6.533.988 2.19.988-2.19 3.258-6.533h.181l2.6 12.095h-1.81l-1.218-5.644-.362-1.71-.658 1.71-2.929 5.644h-.098l-2.914-5.644-.757-1.71-.345 1.71zm1.958-3.42-.726 3.663a1.255 1.255 0 0 1-1.232 1.011h-1.827a1.255 1.255 0 0 1-1.229-1.509l2.501-12.095a1.255 1.255 0 0 1 1.23-1.001h.197a1.255 1.255 0 0 1 1.12.685l3.19 6.273 3.125-6.263a1.255 1.255 0 0 1 1.123-.695h.181a1.255 1.255 0 0 1 1.227.991l1.443 6.71a5.11 5.11 0 0 1 .314-.787l.009-.016a4.623 4.623 0 0 1 1.777-1.887c.782-.46 1.668-.667 2.611-.667a4.548 4.548 0 0 1 1.7.32l.306.134c.21-.16.474-.256.759-.256h1.694a1.255 1.255 0 0 1 1.212.925 1.255 1.255 0 0 1 1.212-.925h1.711c.284 0 .545.094.755.252.613-.3 1.312-.45 2.075-.45 1.356 0 2.557.445 3.482 1.4.314.319.566.676.763 1.064V4.701a1.255 1.255 0 0 1 1.255-1.255h1.86A1.255 1.255 0 0 1 54.44 4.7v9.194h2.217c.19 0 .37.043.532.118v-4.77c0-.356.147-.678.385-.906a2.416 2.416 0 0 1-.682-1.71c0-.665.267-1.253.735-1.7a2.448 2.448 0 0 1 1.722-.674 2.43 2.43 0 0 1 1.705.675c.211.2.381.43.504.683V4.7a1.255 1.255 0 0 1 1.255-1.255h1.744A1.255 1.255 0 0 1 65.812 4.7v3.335a4.76 4.76 0 0 1 1.526-.246c.938 0 1.817.214 2.59.69a4.47 4.47 0 0 1 1.67 1.743v-.98a1.255 1.255 0 0 1 1.256-1.256h1.777c.233 0 .451.064.639.174a3.407 3.407 0 0 1 1.567-.372c.346 0 .861.02 1.285.232a1.255 1.255 0 0 1 .689 1.004 4.73 4.73 0 0 1 .853-.588c.795-.44 1.675-.647 2.61-.647 1.385 0 2.65.39 3.525 1.396.836.938 1.168 2.173 1.168 3.528 0 .343-.02.694-.056 1.051a1.255 1.255 0 0 1-.947 1.09l.408.952a1.255 1.255 0 0 1-.477 1.552c-.418.268-.92.463-1.458.612-.613.171-1.304.244-2.049.244-1.06 0-2.043-.207-2.886-.698l-.015-.008c-.798-.48-1.419-1.135-1.818-1.963l-.004-.008a5.815 5.815 0 0 1-.548-2.512c0-.286.017-.567.053-.843a1.255 1.255 0 0 1-.333-.086l-.166-.004c-.223 0-.426.062-.643.228-.03.024-.142.139-.142.59v3.883a1.255 1.255 0 0 1-1.256 1.256h-1.777a1.255 1.255 0 0 1-1.256-1.256V15.69l-.032.057a4.778 4.778 0 0 1-1.86 1.833 5.04 5.04 0 0 1-2.484.634 4.47 4.47 0 0 1-1.935-.424 1.252 1.252 0 0 1-.764.258h-1.71a1.255 1.255 0 0 1-1.256-1.255V7.687a2.402 2.402 0 0 1-.428.625c.253.23.412.561.412.93v7.553a1.255 1.255 0 0 1-1.256 1.255h-1.843a1.25 1.25 0 0 1-.894-.373c-.228.23-.544.373-.894.373H51.32a1.255 1.255 0 0 1-1.256-1.255v-1.251l-.061.117a4.703 4.703 0 0 1-1.782 1.884 4.767 4.767 0 0 1-2.485.67 5.6 5.6 0 0 1-1.485-.188l.009 2.764a1.255 1.255 0 0 1-1.255 1.259h-1.729a1.255 1.255 0 0 1-1.255-1.255v-3.537a1.255 1.255 0 0 1-1.167.793h-1.679a1.25 1.25 0 0 1-.77-.263 4.47 4.47 0 0 1-1.945.429c-.885 0-1.724-.21-2.495-.632l-.017-.01a4.983 4.983 0 0 1-1.081-.836 1.255 1.255 0 0 1-1.254 1.312h-1.81a1.255 1.255 0 0 1-1.228-.99l-.782-3.625-2.044 3.939a1.255 1.255 0 0 1-1.115.676h-.098a1.255 1.255 0 0 1-1.116-.68l-2.061-3.994zM35.92 16.63l.207-.114.223-.15c.329-.237.574-.499.735-.785l.061-.118.033 1.332h1.678V9.242h-1.694l-.033 1.267c-.088-.22-.264-.438-.526-.658l-.032-.028a3.16 3.16 0 0 0-.668-.428l-.27-.12a3.293 3.293 0 0 0-1.235-.23c-.757 0-1.415.163-1.974.493a3.36 3.36 0 0 0-1.3 1.382c-.297.593-.444 1.284-.444 2.074 0 .8.17 1.503.51 2.107a3.795 3.795 0 0 0 1.382 1.381 3.883 3.883 0 0 0 1.893.477c.53 0 1.015-.11 1.455-.33zm-2.789-5.38c-.384.45-.575 1.038-.575 1.762 0 .735.186 1.332.559 1.794.384.45.933.675 1.645.675a2.25 2.25 0 0 0 .934-.19 2.17 2.17 0 0 0 .468-.29l.178-.161a2.163 2.163 0 0 0 .397-.561c.163-.333.244-.717.244-1.15v-.115c0-.472-.098-.894-.296-1.267l-.043-.077a2.211 2.211 0 0 0-.633-.709l-.13-.086-.047-.028a2.099 2.099 0 0 0-1.073-.285c-.702 0-1.244.231-1.629.692zm2.316 2.706c.163-.17.28-.407.28-.83v-.114c0-.292-.06-.508-.15-.68a.958.958 0 0 0-.353-.389.851.851 0 0 0-.464-.127c-.4 0-.56.114-.664.239l-.01.012c-.148.174-.275.45-.275.945 0 .506.122.801.27.99.097.11.266.224.68.224.303 0 .504-.09.687-.269zm7.545 1.705a2.626 2.626 0 0 0 .331.423c.213.22.464.402.755.548l.173.074c.433.17.93.255 1.49.255.68 0 1.295-.165 1.844-.493a3.447 3.447 0 0 0 1.316-1.4c.329-.603.493-1.299.493-2.089 0-1.273-.33-2.243-.988-2.913-.658-.68-1.52-1.02-2.584-1.02-.598 0-1.124.115-1.575.347a2.807 2.807 0 0 0-.415.262l-.199.166a3.35 3.35 0 0 0-.64.82V9.242h-1.712v11.553h1.729l-.017-5.134zm.53-1.138c.137.193.297.36.48.5l.155.11.053.034c.34.197.713.297 1.119.297.714 0 1.262-.225 1.645-.675.385-.46.576-1.048.576-1.762 0-.746-.192-1.338-.576-1.777-.372-.45-.92-.675-1.645-.675-.29 0-.569.053-.835.16a2.366 2.366 0 0 0-.284.136 1.99 1.99 0 0 0-.363.254 2.237 2.237 0 0 0-.46.569l-.082.162a2.56 2.56 0 0 0-.213 1.072v.115c0 .471.098.894.296 1.267l.135.211zm.964-.818a1.11 1.11 0 0 0 .367.385.937.937 0 0 0 .476.118c.423 0 .59-.117.687-.23.159-.194.28-.478.28-.95 0-.53-.133-.8-.266-.952l-.021-.025c-.078-.094-.231-.221-.68-.221a.995.995 0 0 0-.503.135l-.012.007a.859.859 0 0 0-.335.343c-.073.133-.132.324-.132.614v.115a1.43 1.43 0 0 0 .14.66zm15.7-6.222c.232-.23.346-.516.346-.856a1.053 1.053 0 0 0-.345-.79 1.175 1.175 0 0 0-.84-.329c-.34 0-.625.11-.855.33a1.053 1.053 0 0 0-.346.79c0 .34.115.625.346.855.23.23.516.346.856.346.34 0 .62-.115.839-.346zm4.337 9.314.033-1.332c.128.269.324.518.59.747l.098.081a3.727 3.727 0 0 0 .316.224l.223.122a3.21 3.21 0 0 0 1.44.322 3.785 3.785 0 0 0 1.875-.477 3.52 3.52 0 0 0 1.382-1.366c.352-.593.526-1.29.526-2.09 0-.79-.147-1.48-.444-2.073a3.235 3.235 0 0 0-1.283-1.399c-.549-.34-1.195-.51-1.942-.51a3.476 3.476 0 0 0-1.527.344l-.086.043-.165.09a3.412 3.412 0 0 0-.33.214c-.288.21-.507.446-.656.707a1.893 1.893 0 0 0-.099.198l.082-1.283V4.701h-1.744v12.095zm.473-2.509a2.482 2.482 0 0 0 .566.7c.078.065.159.125.245.18l.144.08a2.105 2.105 0 0 0 .975.232c.713 0 1.262-.225 1.645-.675.384-.46.576-1.053.576-1.778 0-.734-.192-1.327-.576-1.777-.373-.46-.921-.692-1.645-.692a2.18 2.18 0 0 0-1.015.235c-.147.075-.285.17-.415.282l-.15.142a2.086 2.086 0 0 0-.42.594c-.149.32-.223.685-.223 1.1v.115c0 .47.097.89.293 1.26zm2.616-.293c.157-.191.28-.479.28-.967 0-.51-.13-.79-.276-.961l-.021-.026c-.082-.1-.232-.225-.67-.225a.868.868 0 0 0-.681.279l-.012.011c-.154.155-.274.38-.274.807v.115c0 .285.057.499.144.669a1.13 1.13 0 0 0 .367.405c.137.082.28.123.455.123.423 0 .59-.118.686-.23zm8.266-3.013c.23-.087.472-.134.724-.14l.069-.002c.329 0 .542.033.642.099l.247-1.794c-.13-.066-.37-.099-.717-.099a2.3 2.3 0 0 0-.545.063 2.086 2.086 0 0 0-.411.148 2.18 2.18 0 0 0-.4.249 2.482 2.482 0 0 0-.485.499 2.659 2.659 0 0 0-.32.581l-.05.137v-1.48h-1.778v7.553h1.777v-3.884c0-.364.053-.678.159-.943a1.49 1.49 0 0 1 .466-.636 2.52 2.52 0 0 1 .399-.253 2.19 2.19 0 0 1 .224-.099zm9.784 2.656.05-.922c0-1.162-.285-2.062-.856-2.698-.559-.647-1.42-.97-2.584-.97-.746 0-1.415.163-2.007.493a3.462 3.462 0 0 0-1.4 1.382c-.329.604-.493 1.306-.493 2.106 0 .714.143 1.371.428 1.975.285.593.73 1.07 1.332 1.432.604.351 1.355.526 2.255.526.649 0 1.204-.062 1.668-.185l.044-.012.135-.04c.409-.122.736-.263.984-.421l-.542-1.267c-.2.108-.415.199-.642.274l-.297.087c-.34.088-.773.131-1.3.131-.636 0-1.135-.147-1.497-.444a1.573 1.573 0 0 1-.192-.193c-.244-.294-.415-.705-.512-1.234l-.004-.021h5.43zm-5.427-1.256-.003.022h3.752v-.138c-.007-.485-.104-.857-.288-1.118a1.056 1.056 0 0 0-.156-.176c-.307-.285-.746-.428-1.316-.428-.657 0-1.155.202-1.494.604-.253.3-.417.712-.494 1.234zm-27.053 2.77V4.7h-1.86v12.095h5.333V15.15zm7.103-5.908v7.553h-1.843V9.242h1.843z' fill='%23000' fill-opacity='.4' fill-rule='evenodd'/%3E%3Cpath d='m19.63 11.151-.757-1.71-.345 1.71-1.12 5.644h-1.827L18.083 4.7h.197l3.325 6.533.988 2.19.988-2.19L26.839 4.7h.181l2.6 12.095h-1.81l-1.218-5.644-.362-1.71-.658 1.71-2.93 5.644h-.098l-2.913-5.644zm14.836 5.81c-.68 0-1.311-.16-1.893-.478a3.795 3.795 0 0 1-1.381-1.382c-.34-.604-.51-1.306-.51-2.106 0-.79.147-1.482.444-2.074a3.364 3.364 0 0 1 1.3-1.382c.559-.33 1.217-.494 1.974-.494a3.293 3.293 0 0 1 1.234.231 3.341 3.341 0 0 1 .97.575c.264.22.44.439.527.659l.033-1.267h1.694v7.553H37.18l-.033-1.332c-.186.395-.526.746-1.02 1.053a3.167 3.167 0 0 1-1.662.444zm.296-1.482c.626 0 1.152-.214 1.58-.642.428-.44.642-1.01.642-1.711v-.115c0-.472-.098-.894-.296-1.267a2.211 2.211 0 0 0-.807-.872 2.098 2.098 0 0 0-1.119-.313c-.702 0-1.245.231-1.629.692-.384.45-.575 1.037-.575 1.76 0 .736.186 1.333.559 1.795.384.45.933.675 1.645.675zm6.521-6.237h1.711v1.4c.604-1.065 1.547-1.597 2.83-1.597 1.064 0 1.926.34 2.584 1.02.659.67.988 1.641.988 2.914 0 .79-.164 1.487-.493 2.09a3.456 3.456 0 0 1-1.316 1.399 3.51 3.51 0 0 1-1.844.493c-.636 0-1.19-.11-1.662-.329a2.665 2.665 0 0 1-1.086-.97l.017 5.134h-1.728V9.242zm4.048 6.22c.714 0 1.262-.224 1.645-.674.385-.46.576-1.048.576-1.762 0-.746-.192-1.338-.576-1.777-.372-.45-.92-.675-1.645-.675-.395 0-.768.098-1.12.296-.34.187-.613.46-.822.823-.197.351-.296.763-.296 1.234v.115c0 .472.098.894.296 1.267.209.362.483.647.823.855.34.197.713.297 1.119.297z' fill='%23fff'/%3E%3Cpath d='M51.325 4.7h1.86v10.45h3.473v1.646h-5.333zm7.12 4.542h1.843v7.553h-1.843zm.905-1.415a1.159 1.159 0 0 1-.856-.346 1.165 1.165 0 0 1-.346-.856 1.053 1.053 0 0 1 .346-.79c.23-.219.516-.329.856-.329.329 0 .609.11.839.33a1.053 1.053 0 0 1 .345.79 1.159 1.159 0 0 1-.345.855c-.22.23-.5.346-.84.346zm7.875 9.133a3.167 3.167 0 0 1-1.662-.444c-.482-.307-.817-.658-1.004-1.053l-.033 1.332h-1.71V4.701h1.743v4.657l-.082 1.283c.186-.438.548-.812 1.086-1.119a3.486 3.486 0 0 1 1.778-.477c.746 0 1.393.17 1.942.51a3.235 3.235 0 0 1 1.283 1.4c.297.592.444 1.282.444 2.072 0 .8-.175 1.498-.526 2.09a3.52 3.52 0 0 1-1.382 1.366 3.785 3.785 0 0 1-1.876.477zm-.296-1.481c.713 0 1.26-.225 1.645-.675.384-.46.577-1.053.577-1.778 0-.734-.193-1.327-.577-1.776-.373-.46-.921-.692-1.645-.692a2.115 2.115 0 0 0-1.58.659c-.428.428-.642.992-.642 1.694v.115c0 .473.098.895.296 1.267a2.385 2.385 0 0 0 .807.872 2.1 2.1 0 0 0 1.119.313zm5.927-6.237h1.777v1.481c.176-.505.46-.91.856-1.217a2.14 2.14 0 0 1 1.349-.46c.351 0 .593.032.724.098l-.247 1.794c-.099-.066-.313-.099-.642-.099-.516 0-.988.164-1.416.494-.417.329-.626.855-.626 1.58v3.883h-1.777V9.242zm9.534 7.718c-.9 0-1.651-.175-2.255-.526-.603-.362-1.047-.84-1.332-1.432a4.567 4.567 0 0 1-.428-1.975c0-.8.164-1.502.493-2.106a3.462 3.462 0 0 1 1.4-1.382c.592-.33 1.262-.494 2.007-.494 1.163 0 2.024.324 2.584.97.57.637.856 1.537.856 2.7 0 .296-.017.603-.05.92h-5.43c.12.67.356 1.153.708 1.45.362.296.86.443 1.497.443.526 0 .96-.044 1.3-.131a4.123 4.123 0 0 0 .938-.362l.542 1.267c-.274.175-.647.329-1.119.46-.472.132-1.042.197-1.711.197zm1.596-4.558c.01-.68-.137-1.158-.444-1.432-.307-.285-.746-.428-1.316-.428-1.152 0-1.815.62-1.991 1.86h3.752z' fill='%23e1e3e9'/%3E%3Cg fill-rule='evenodd' stroke-width='1.036'%3E%3Cpath d='m8.166 16.146-.002.002a1.54 1.54 0 0 1-2.009 0l-.002-.002-.043-.034-.002-.002-.199-.162H4.377a.657.657 0 0 0-.659.659v1.84a.657.657 0 0 0 .659.659h5.565a.657.657 0 0 0 .659-.659v-1.84a.657.657 0 0 0-.659-.659H8.411l-.202.164zm-1.121-.905a.29.29 0 0 0 .113.023.286.286 0 0 0 .189-.07l.077-.063c.634-.508 4.672-3.743 4.672-7.575 0-2.55-2.215-4.625-4.938-4.625S2.221 5.006 2.221 7.556c0 3.225 2.86 6.027 4.144 7.137h.004l.04.038.484.4.077.063a.628.628 0 0 0 .074.047zm-2.52-.548a16.898 16.898 0 0 1-1.183-1.315C2.187 11.942.967 9.897.967 7.555c0-3.319 2.855-5.88 6.192-5.88 3.338 0 6.193 2.561 6.193 5.881 0 2.34-1.22 4.387-2.376 5.822a16.898 16.898 0 0 1-1.182 1.315h.15a1.912 1.912 0 0 1 1.914 1.914v1.84a1.912 1.912 0 0 1-1.914 1.914H4.377a1.912 1.912 0 0 1-1.914-1.914v-1.84a1.912 1.912 0 0 1 1.914-1.914zm3.82-6.935c0 .692-.55 1.222-1.187 1.222s-1.185-.529-1.185-1.222.548-1.222 1.185-1.222c.638 0 1.186.529 1.186 1.222zm-1.186 2.477c1.348 0 2.442-1.11 2.442-2.478S8.507 5.28 7.159 5.28 4.72 6.39 4.72 7.758s1.092 2.477 2.44 2.477zm2.048 7.71H5.114v-.838h4.093z' fill='%23000' fill-opacity='.4'/%3E%3Cpath d='M2.222 7.555c0-2.55 2.214-4.625 4.937-4.625 2.723 0 4.938 2.075 4.938 4.625 0 3.832-4.038 7.068-4.672 7.575l-.077.063a.286.286 0 0 1-.189.07.286.286 0 0 1-.188-.07l-.077-.063c-.634-.507-4.672-3.743-4.672-7.575zm4.937 2.68c1.348 0 2.442-1.11 2.442-2.478S8.507 5.28 7.159 5.28 4.72 6.39 4.72 7.758s1.092 2.477 2.44 2.477z' fill='%23e1e3e9'/%3E%3Cpath d='M4.377 15.948a.657.657 0 0 0-.659.659v1.84a.657.657 0 0 0 .659.659h5.565a.657.657 0 0 0 .659-.659v-1.84a.657.657 0 0 0-.659-.659zm4.83 1.16H5.114v.838h4.093z' fill='%23fff'/%3E%3C/g%3E%3C/svg%3E");
            background-repeat: no-repeat;
            cursor: pointer;
            display: block;
            height: 23px;
            margin: 0 0 -4px -4px;
            overflow: hidden;
            width: 88px;
        }
        a.mapboxgl-ctrl-logo.mapboxgl-compact,
        a.maplibregl-ctrl-logo.maplibregl-compact {
            width: 14px;
        }
        @media (-ms-high-contrast: active) {
            a.mapboxgl-ctrl-logo,
            a.maplibregl-ctrl-logo {
                background-color: transparent;
                background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='88' height='23' fill='none'%3E%3Cpath d='M17.408 16.796h-1.827l2.501-12.095h.198l3.324 6.533.988 2.19.988-2.19 3.258-6.533h.181l2.6 12.095h-1.81l-1.218-5.644-.362-1.71-.658 1.71-2.929 5.644h-.098l-2.914-5.644-.757-1.71-.345 1.71zm1.958-3.42-.726 3.663a1.255 1.255 0 0 1-1.232 1.011h-1.827a1.255 1.255 0 0 1-1.229-1.509l2.501-12.095a1.255 1.255 0 0 1 1.23-1.001h.197a1.255 1.255 0 0 1 1.12.685l3.19 6.273 3.125-6.263a1.255 1.255 0 0 1 1.123-.695h.181a1.255 1.255 0 0 1 1.227.991l1.443 6.71a5.11 5.11 0 0 1 .314-.787l.009-.016a4.623 4.623 0 0 1 1.777-1.887c.782-.46 1.668-.667 2.611-.667a4.548 4.548 0 0 1 1.7.32l.306.134c.21-.16.474-.256.759-.256h1.694a1.255 1.255 0 0 1 1.212.925 1.255 1.255 0 0 1 1.212-.925h1.711c.284 0 .545.094.755.252.613-.3 1.312-.45 2.075-.45 1.356 0 2.557.445 3.482 1.4.314.319.566.676.763 1.064V4.701a1.255 1.255 0 0 1 1.255-1.255h1.86A1.255 1.255 0 0 1 54.44 4.7v9.194h2.217c.19 0 .37.043.532.118v-4.77c0-.356.147-.678.385-.906a2.416 2.416 0 0 1-.682-1.71c0-.665.267-1.253.735-1.7a2.448 2.448 0 0 1 1.722-.674 2.43 2.43 0 0 1 1.705.675c.211.2.381.43.504.683V4.7a1.255 1.255 0 0 1 1.255-1.255h1.744A1.255 1.255 0 0 1 65.812 4.7v3.335a4.76 4.76 0 0 1 1.526-.246c.938 0 1.817.214 2.59.69a4.47 4.47 0 0 1 1.67 1.743v-.98a1.255 1.255 0 0 1 1.256-1.256h1.777c.233 0 .451.064.639.174a3.407 3.407 0 0 1 1.567-.372c.346 0 .861.02 1.285.232a1.255 1.255 0 0 1 .689 1.004 4.73 4.73 0 0 1 .853-.588c.795-.44 1.675-.647 2.61-.647 1.385 0 2.65.39 3.525 1.396.836.938 1.168 2.173 1.168 3.528 0 .343-.02.694-.056 1.051a1.255 1.255 0 0 1-.947 1.09l.408.952a1.255 1.255 0 0 1-.477 1.552c-.418.268-.92.463-1.458.612-.613.171-1.304.244-2.049.244-1.06 0-2.043-.207-2.886-.698l-.015-.008c-.798-.48-1.419-1.135-1.818-1.963l-.004-.008a5.815 5.815 0 0 1-.548-2.512c0-.286.017-.567.053-.843a1.255 1.255 0 0 1-.333-.086l-.166-.004c-.223 0-.426.062-.643.228-.03.024-.142.139-.142.59v3.883a1.255 1.255 0 0 1-1.256 1.256h-1.777a1.255 1.255 0 0 1-1.256-1.256V15.69l-.032.057a4.778 4.778 0 0 1-1.86 1.833 5.04 5.04 0 0 1-2.484.634 4.47 4.47 0 0 1-1.935-.424 1.252 1.252 0 0 1-.764.258h-1.71a1.255 1.255 0 0 1-1.256-1.255V7.687a2.402 2.402 0 0 1-.428.625c.253.23.412.561.412.93v7.553a1.255 1.255 0 0 1-1.256 1.255h-1.843a1.25 1.25 0 0 1-.894-.373c-.228.23-.544.373-.894.373H51.32a1.255 1.255 0 0 1-1.256-1.255v-1.251l-.061.117a4.703 4.703 0 0 1-1.782 1.884 4.767 4.767 0 0 1-2.485.67 5.6 5.6 0 0 1-1.485-.188l.009 2.764a1.255 1.255 0 0 1-1.255 1.259h-1.729a1.255 1.255 0 0 1-1.255-1.255v-3.537a1.255 1.255 0 0 1-1.167.793h-1.679a1.25 1.25 0 0 1-.77-.263 4.47 4.47 0 0 1-1.945.429c-.885 0-1.724-.21-2.495-.632l-.017-.01a4.983 4.983 0 0 1-1.081-.836 1.255 1.255 0 0 1-1.254 1.312h-1.81a1.255 1.255 0 0 1-1.228-.99l-.782-3.625-2.044 3.939a1.255 1.255 0 0 1-1.115.676h-.098a1.255 1.255 0 0 1-1.116-.68l-2.061-3.994zM35.92 16.63l.207-.114.223-.15c.329-.237.574-.499.735-.785l.061-.118.033 1.332h1.678V9.242h-1.694l-.033 1.267c-.088-.22-.264-.438-.526-.658l-.032-.028a3.16 3.16 0 0 0-.668-.428l-.27-.12a3.293 3.293 0 0 0-1.235-.23c-.757 0-1.415.163-1.974.493a3.36 3.36 0 0 0-1.3 1.382c-.297.593-.444 1.284-.444 2.074 0 .8.17 1.503.51 2.107a3.795 3.795 0 0 0 1.382 1.381 3.883 3.883 0 0 0 1.893.477c.53 0 1.015-.11 1.455-.33zm-2.789-5.38c-.384.45-.575 1.038-.575 1.762 0 .735.186 1.332.559 1.794.384.45.933.675 1.645.675a2.25 2.25 0 0 0 .934-.19 2.17 2.17 0 0 0 .468-.29l.178-.161a2.163 2.163 0 0 0 .397-.561c.163-.333.244-.717.244-1.15v-.115c0-.472-.098-.894-.296-1.267l-.043-.077a2.211 2.211 0 0 0-.633-.709l-.13-.086-.047-.028a2.099 2.099 0 0 0-1.073-.285c-.702 0-1.244.231-1.629.692zm2.316 2.706c.163-.17.28-.407.28-.83v-.114c0-.292-.06-.508-.15-.68a.958.958 0 0 0-.353-.389.851.851 0 0 0-.464-.127c-.4 0-.56.114-.664.239l-.01.012c-.148.174-.275.45-.275.945 0 .506.122.801.27.99.097.11.266.224.68.224.303 0 .504-.09.687-.269zm7.545 1.705a2.626 2.626 0 0 0 .331.423c.213.22.464.402.755.548l.173.074c.433.17.93.255 1.49.255.68 0 1.295-.165 1.844-.493a3.447 3.447 0 0 0 1.316-1.4c.329-.603.493-1.299.493-2.089 0-1.273-.33-2.243-.988-2.913-.658-.68-1.52-1.02-2.584-1.02-.598 0-1.124.115-1.575.347a2.807 2.807 0 0 0-.415.262l-.199.166a3.35 3.35 0 0 0-.64.82V9.242h-1.712v11.553h1.729l-.017-5.134zm.53-1.138c.137.193.297.36.48.5l.155.11.053.034c.34.197.713.297 1.119.297.714 0 1.262-.225 1.645-.675.385-.46.576-1.048.576-1.762 0-.746-.192-1.338-.576-1.777-.372-.45-.92-.675-1.645-.675-.29 0-.569.053-.835.16a2.366 2.366 0 0 0-.284.136 1.99 1.99 0 0 0-.363.254 2.237 2.237 0 0 0-.46.569l-.082.162a2.56 2.56 0 0 0-.213 1.072v.115c0 .471.098.894.296 1.267l.135.211zm.964-.818a1.11 1.11 0 0 0 .367.385.937.937 0 0 0 .476.118c.423 0 .59-.117.687-.23.159-.194.28-.478.28-.95 0-.53-.133-.8-.266-.952l-.021-.025c-.078-.094-.231-.221-.68-.221a.995.995 0 0 0-.503.135l-.012.007a.859.859 0 0 0-.335.343c-.073.133-.132.324-.132.614v.115a1.43 1.43 0 0 0 .14.66zm15.7-6.222c.232-.23.346-.516.346-.856a1.053 1.053 0 0 0-.345-.79 1.175 1.175 0 0 0-.84-.329c-.34 0-.625.11-.855.33a1.053 1.053 0 0 0-.346.79c0 .34.115.625.346.855.23.23.516.346.856.346.34 0 .62-.115.839-.346zm4.337 9.314.033-1.332c.128.269.324.518.59.747l.098.081a3.727 3.727 0 0 0 .316.224l.223.122a3.21 3.21 0 0 0 1.44.322 3.785 3.785 0 0 0 1.875-.477 3.52 3.52 0 0 0 1.382-1.366c.352-.593.526-1.29.526-2.09 0-.79-.147-1.48-.444-2.073a3.235 3.235 0 0 0-1.283-1.399c-.549-.34-1.195-.51-1.942-.51a3.476 3.476 0 0 0-1.527.344l-.086.043-.165.09a3.412 3.412 0 0 0-.33.214c-.288.21-.507.446-.656.707a1.893 1.893 0 0 0-.099.198l.082-1.283V4.701h-1.744v12.095zm.473-2.509a2.482 2.482 0 0 0 .566.7c.078.065.159.125.245.18l.144.08a2.105 2.105 0 0 0 .975.232c.713 0 1.262-.225 1.645-.675.384-.46.576-1.053.576-1.778 0-.734-.192-1.327-.576-1.777-.373-.46-.921-.692-1.645-.692a2.18 2.18 0 0 0-1.015.235c-.147.075-.285.17-.415.282l-.15.142a2.086 2.086 0 0 0-.42.594c-.149.32-.223.685-.223 1.1v.115c0 .47.097.89.293 1.26zm2.616-.293c.157-.191.28-.479.28-.967 0-.51-.13-.79-.276-.961l-.021-.026c-.082-.1-.232-.225-.67-.225a.868.868 0 0 0-.681.279l-.012.011c-.154.155-.274.38-.274.807v.115c0 .285.057.499.144.669a1.13 1.13 0 0 0 .367.405c.137.082.28.123.455.123.423 0 .59-.118.686-.23zm8.266-3.013c.23-.087.472-.134.724-.14l.069-.002c.329 0 .542.033.642.099l.247-1.794c-.13-.066-.37-.099-.717-.099a2.3 2.3 0 0 0-.545.063 2.086 2.086 0 0 0-.411.148 2.18 2.18 0 0 0-.4.249 2.482 2.482 0 0 0-.485.499 2.659 2.659 0 0 0-.32.581l-.05.137v-1.48h-1.778v7.553h1.777v-3.884c0-.364.053-.678.159-.943a1.49 1.49 0 0 1 .466-.636 2.52 2.52 0 0 1 .399-.253 2.19 2.19 0 0 1 .224-.099zm9.784 2.656.05-.922c0-1.162-.285-2.062-.856-2.698-.559-.647-1.42-.97-2.584-.97-.746 0-1.415.163-2.007.493a3.462 3.462 0 0 0-1.4 1.382c-.329.604-.493 1.306-.493 2.106 0 .714.143 1.371.428 1.975.285.593.73 1.07 1.332 1.432.604.351 1.355.526 2.255.526.649 0 1.204-.062 1.668-.185l.044-.012.135-.04c.409-.122.736-.263.984-.421l-.542-1.267c-.2.108-.415.199-.642.274l-.297.087c-.34.088-.773.131-1.3.131-.636 0-1.135-.147-1.497-.444a1.573 1.573 0 0 1-.192-.193c-.244-.294-.415-.705-.512-1.234l-.004-.021h5.43zm-5.427-1.256-.003.022h3.752v-.138c-.007-.485-.104-.857-.288-1.118a1.056 1.056 0 0 0-.156-.176c-.307-.285-.746-.428-1.316-.428-.657 0-1.155.202-1.494.604-.253.3-.417.712-.494 1.234zm-27.053 2.77V4.7h-1.86v12.095h5.333V15.15zm7.103-5.908v7.553h-1.843V9.242h1.843z' fill='%23000' fill-opacity='.4' fill-rule='evenodd'/%3E%3Cpath d='m19.63 11.151-.757-1.71-.345 1.71-1.12 5.644h-1.827L18.083 4.7h.197l3.325 6.533.988 2.19.988-2.19L26.839 4.7h.181l2.6 12.095h-1.81l-1.218-5.644-.362-1.71-.658 1.71-2.93 5.644h-.098l-2.913-5.644zm14.836 5.81c-.68 0-1.311-.16-1.893-.478a3.795 3.795 0 0 1-1.381-1.382c-.34-.604-.51-1.306-.51-2.106 0-.79.147-1.482.444-2.074a3.364 3.364 0 0 1 1.3-1.382c.559-.33 1.217-.494 1.974-.494a3.293 3.293 0 0 1 1.234.231 3.341 3.341 0 0 1 .97.575c.264.22.44.439.527.659l.033-1.267h1.694v7.553H37.18l-.033-1.332c-.186.395-.526.746-1.02 1.053a3.167 3.167 0 0 1-1.662.444zm.296-1.482c.626 0 1.152-.214 1.58-.642.428-.44.642-1.01.642-1.711v-.115c0-.472-.098-.894-.296-1.267a2.211 2.211 0 0 0-.807-.872 2.098 2.098 0 0 0-1.119-.313c-.702 0-1.245.231-1.629.692-.384.45-.575 1.037-.575 1.76 0 .736.186 1.333.559 1.795.384.45.933.675 1.645.675zm6.521-6.237h1.711v1.4c.604-1.065 1.547-1.597 2.83-1.597 1.064 0 1.926.34 2.584 1.02.659.67.988 1.641.988 2.914 0 .79-.164 1.487-.493 2.09a3.456 3.456 0 0 1-1.316 1.399 3.51 3.51 0 0 1-1.844.493c-.636 0-1.19-.11-1.662-.329a2.665 2.665 0 0 1-1.086-.97l.017 5.134h-1.728V9.242zm4.048 6.22c.714 0 1.262-.224 1.645-.674.385-.46.576-1.048.576-1.762 0-.746-.192-1.338-.576-1.777-.372-.45-.92-.675-1.645-.675-.395 0-.768.098-1.12.296-.34.187-.613.46-.822.823-.197.351-.296.763-.296 1.234v.115c0 .472.098.894.296 1.267.209.362.483.647.823.855.34.197.713.297 1.119.297z' fill='%23fff'/%3E%3Cpath d='M51.325 4.7h1.86v10.45h3.473v1.646h-5.333zm7.12 4.542h1.843v7.553h-1.843zm.905-1.415a1.159 1.159 0 0 1-.856-.346 1.165 1.165 0 0 1-.346-.856 1.053 1.053 0 0 1 .346-.79c.23-.219.516-.329.856-.329.329 0 .609.11.839.33a1.053 1.053 0 0 1 .345.79 1.159 1.159 0 0 1-.345.855c-.22.23-.5.346-.84.346zm7.875 9.133a3.167 3.167 0 0 1-1.662-.444c-.482-.307-.817-.658-1.004-1.053l-.033 1.332h-1.71V4.701h1.743v4.657l-.082 1.283c.186-.438.548-.812 1.086-1.119a3.486 3.486 0 0 1 1.778-.477c.746 0 1.393.17 1.942.51a3.235 3.235 0 0 1 1.283 1.4c.297.592.444 1.282.444 2.072 0 .8-.175 1.498-.526 2.09a3.52 3.52 0 0 1-1.382 1.366 3.785 3.785 0 0 1-1.876.477zm-.296-1.481c.713 0 1.26-.225 1.645-.675.384-.46.577-1.053.577-1.778 0-.734-.193-1.327-.577-1.776-.373-.46-.921-.692-1.645-.692a2.115 2.115 0 0 0-1.58.659c-.428.428-.642.992-.642 1.694v.115c0 .473.098.895.296 1.267a2.385 2.385 0 0 0 .807.872 2.1 2.1 0 0 0 1.119.313zm5.927-6.237h1.777v1.481c.176-.505.46-.91.856-1.217a2.14 2.14 0 0 1 1.349-.46c.351 0 .593.032.724.098l-.247 1.794c-.099-.066-.313-.099-.642-.099-.516 0-.988.164-1.416.494-.417.329-.626.855-.626 1.58v3.883h-1.777V9.242zm9.534 7.718c-.9 0-1.651-.175-2.255-.526-.603-.362-1.047-.84-1.332-1.432a4.567 4.567 0 0 1-.428-1.975c0-.8.164-1.502.493-2.106a3.462 3.462 0 0 1 1.4-1.382c.592-.33 1.262-.494 2.007-.494 1.163 0 2.024.324 2.584.97.57.637.856 1.537.856 2.7 0 .296-.017.603-.05.92h-5.43c.12.67.356 1.153.708 1.45.362.296.86.443 1.497.443.526 0 .96-.044 1.3-.131a4.123 4.123 0 0 0 .938-.362l.542 1.267c-.274.175-.647.329-1.119.46-.472.132-1.042.197-1.711.197zm1.596-4.558c.01-.68-.137-1.158-.444-1.432-.307-.285-.746-.428-1.316-.428-1.152 0-1.815.62-1.991 1.86h3.752z' fill='%23e1e3e9'/%3E%3Cg fill-rule='evenodd' stroke-width='1.036'%3E%3Cpath d='m8.166 16.146-.002.002a1.54 1.54 0 0 1-2.009 0l-.002-.002-.043-.034-.002-.002-.199-.162H4.377a.657.657 0 0 0-.659.659v1.84a.657.657 0 0 0 .659.659h5.565a.657.657 0 0 0 .659-.659v-1.84a.657.657 0 0 0-.659-.659H8.411l-.202.164zm-1.121-.905a.29.29 0 0 0 .113.023.286.286 0 0 0 .189-.07l.077-.063c.634-.508 4.672-3.743 4.672-7.575 0-2.55-2.215-4.625-4.938-4.625S2.221 5.006 2.221 7.556c0 3.225 2.86 6.027 4.144 7.137h.004l.04.038.484.4.077.063a.628.628 0 0 0 .074.047zm-2.52-.548a16.898 16.898 0 0 1-1.183-1.315C2.187 11.942.967 9.897.967 7.555c0-3.319 2.855-5.88 6.192-5.88 3.338 0 6.193 2.561 6.193 5.881 0 2.34-1.22 4.387-2.376 5.822a16.898 16.898 0 0 1-1.182 1.315h.15a1.912 1.912 0 0 1 1.914 1.914v1.84a1.912 1.912 0 0 1-1.914 1.914H4.377a1.912 1.912 0 0 1-1.914-1.914v-1.84a1.912 1.912 0 0 1 1.914-1.914zm3.82-6.935c0 .692-.55 1.222-1.187 1.222s-1.185-.529-1.185-1.222.548-1.222 1.185-1.222c.638 0 1.186.529 1.186 1.222zm-1.186 2.477c1.348 0 2.442-1.11 2.442-2.478S8.507 5.28 7.159 5.28 4.72 6.39 4.72 7.758s1.092 2.477 2.44 2.477zm2.048 7.71H5.114v-.838h4.093z' fill='%23000' fill-opacity='.4'/%3E%3Cpath d='M2.222 7.555c0-2.55 2.214-4.625 4.937-4.625 2.723 0 4.938 2.075 4.938 4.625 0 3.832-4.038 7.068-4.672 7.575l-.077.063a.286.286 0 0 1-.189.07.286.286 0 0 1-.188-.07l-.077-.063c-.634-.507-4.672-3.743-4.672-7.575zm4.937 2.68c1.348 0 2.442-1.11 2.442-2.478S8.507 5.28 7.159 5.28 4.72 6.39 4.72 7.758s1.092 2.477 2.44 2.477z' fill='%23e1e3e9'/%3E%3Cpath d='M4.377 15.948a.657.657 0 0 0-.659.659v1.84a.657.657 0 0 0 .659.659h5.565a.657.657 0 0 0 .659-.659v-1.84a.657.657 0 0 0-.659-.659zm4.83 1.16H5.114v.838h4.093z' fill='%23fff'/%3E%3C/g%3E%3C/svg%3E");
            }
        }
        @media (-ms-high-contrast: black-on-white) {
            a.mapboxgl-ctrl-logo,
            a.maplibregl-ctrl-logo {
                background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='88' height='23' fill='none'%3E%3Cpath d='M17.408 16.796h-1.827l2.501-12.095h.198l3.324 6.533.988 2.19.988-2.19 3.258-6.533h.181l2.6 12.095h-1.81l-1.218-5.644-.362-1.71-.658 1.71-2.929 5.644h-.098l-2.914-5.644-.757-1.71-.345 1.71zm1.958-3.42-.726 3.663a1.255 1.255 0 0 1-1.232 1.011h-1.827a1.255 1.255 0 0 1-1.229-1.509l2.501-12.095a1.255 1.255 0 0 1 1.23-1.001h.197a1.255 1.255 0 0 1 1.12.685l3.19 6.273 3.125-6.263a1.255 1.255 0 0 1 1.123-.695h.181a1.255 1.255 0 0 1 1.227.991l1.443 6.71a5.11 5.11 0 0 1 .314-.787l.009-.016a4.623 4.623 0 0 1 1.777-1.887c.782-.46 1.668-.667 2.611-.667a4.548 4.548 0 0 1 1.7.32l.306.134c.21-.16.474-.256.759-.256h1.694a1.255 1.255 0 0 1 1.212.925 1.255 1.255 0 0 1 1.212-.925h1.711c.284 0 .545.094.755.252.613-.3 1.312-.45 2.075-.45 1.356 0 2.557.445 3.482 1.4.314.319.566.676.763 1.064V4.701a1.255 1.255 0 0 1 1.255-1.255h1.86A1.255 1.255 0 0 1 54.44 4.7v9.194h2.217c.19 0 .37.043.532.118v-4.77c0-.356.147-.678.385-.906a2.416 2.416 0 0 1-.682-1.71c0-.665.267-1.253.735-1.7a2.448 2.448 0 0 1 1.722-.674 2.43 2.43 0 0 1 1.705.675c.211.2.381.43.504.683V4.7a1.255 1.255 0 0 1 1.255-1.255h1.744A1.255 1.255 0 0 1 65.812 4.7v3.335a4.76 4.76 0 0 1 1.526-.246c.938 0 1.817.214 2.59.69a4.47 4.47 0 0 1 1.67 1.743v-.98a1.255 1.255 0 0 1 1.256-1.256h1.777c.233 0 .451.064.639.174a3.407 3.407 0 0 1 1.567-.372c.346 0 .861.02 1.285.232a1.255 1.255 0 0 1 .689 1.004 4.73 4.73 0 0 1 .853-.588c.795-.44 1.675-.647 2.61-.647 1.385 0 2.65.39 3.525 1.396.836.938 1.168 2.173 1.168 3.528 0 .343-.02.694-.056 1.051a1.255 1.255 0 0 1-.947 1.09l.408.952a1.255 1.255 0 0 1-.477 1.552c-.418.268-.92.463-1.458.612-.613.171-1.304.244-2.049.244-1.06 0-2.043-.207-2.886-.698l-.015-.008c-.798-.48-1.419-1.135-1.818-1.963l-.004-.008a5.815 5.815 0 0 1-.548-2.512c0-.286.017-.567.053-.843a1.255 1.255 0 0 1-.333-.086l-.166-.004c-.223 0-.426.062-.643.228-.03.024-.142.139-.142.59v3.883a1.255 1.255 0 0 1-1.256 1.256h-1.777a1.255 1.255 0 0 1-1.256-1.256V15.69l-.032.057a4.778 4.778 0 0 1-1.86 1.833 5.04 5.04 0 0 1-2.484.634 4.47 4.47 0 0 1-1.935-.424 1.252 1.252 0 0 1-.764.258h-1.71a1.255 1.255 0 0 1-1.256-1.255V7.687a2.402 2.402 0 0 1-.428.625c.253.23.412.561.412.93v7.553a1.255 1.255 0 0 1-1.256 1.255h-1.843a1.25 1.25 0 0 1-.894-.373c-.228.23-.544.373-.894.373H51.32a1.255 1.255 0 0 1-1.256-1.255v-1.251l-.061.117a4.703 4.703 0 0 1-1.782 1.884 4.767 4.767 0 0 1-2.485.67 5.6 5.6 0 0 1-1.485-.188l.009 2.764a1.255 1.255 0 0 1-1.255 1.259h-1.729a1.255 1.255 0 0 1-1.255-1.255v-3.537a1.255 1.255 0 0 1-1.167.793h-1.679a1.25 1.25 0 0 1-.77-.263 4.47 4.47 0 0 1-1.945.429c-.885 0-1.724-.21-2.495-.632l-.017-.01a4.983 4.983 0 0 1-1.081-.836 1.255 1.255 0 0 1-1.254 1.312h-1.81a1.255 1.255 0 0 1-1.228-.99l-.782-3.625-2.044 3.939a1.255 1.255 0 0 1-1.115.676h-.098a1.255 1.255 0 0 1-1.116-.68l-2.061-3.994zM35.92 16.63l.207-.114.223-.15c.329-.237.574-.499.735-.785l.061-.118.033 1.332h1.678V9.242h-1.694l-.033 1.267c-.088-.22-.264-.438-.526-.658l-.032-.028a3.16 3.16 0 0 0-.668-.428l-.27-.12a3.293 3.293 0 0 0-1.235-.23c-.757 0-1.415.163-1.974.493a3.36 3.36 0 0 0-1.3 1.382c-.297.593-.444 1.284-.444 2.074 0 .8.17 1.503.51 2.107a3.795 3.795 0 0 0 1.382 1.381 3.883 3.883 0 0 0 1.893.477c.53 0 1.015-.11 1.455-.33zm-2.789-5.38c-.384.45-.575 1.038-.575 1.762 0 .735.186 1.332.559 1.794.384.45.933.675 1.645.675a2.25 2.25 0 0 0 .934-.19 2.17 2.17 0 0 0 .468-.29l.178-.161a2.163 2.163 0 0 0 .397-.561c.163-.333.244-.717.244-1.15v-.115c0-.472-.098-.894-.296-1.267l-.043-.077a2.211 2.211 0 0 0-.633-.709l-.13-.086-.047-.028a2.099 2.099 0 0 0-1.073-.285c-.702 0-1.244.231-1.629.692zm2.316 2.706c.163-.17.28-.407.28-.83v-.114c0-.292-.06-.508-.15-.68a.958.958 0 0 0-.353-.389.851.851 0 0 0-.464-.127c-.4 0-.56.114-.664.239l-.01.012c-.148.174-.275.45-.275.945 0 .506.122.801.27.99.097.11.266.224.68.224.303 0 .504-.09.687-.269zm7.545 1.705a2.626 2.626 0 0 0 .331.423c.213.22.464.402.755.548l.173.074c.433.17.93.255 1.49.255.68 0 1.295-.165 1.844-.493a3.447 3.447 0 0 0 1.316-1.4c.329-.603.493-1.299.493-2.089 0-1.273-.33-2.243-.988-2.913-.658-.68-1.52-1.02-2.584-1.02-.598 0-1.124.115-1.575.347a2.807 2.807 0 0 0-.415.262l-.199.166a3.35 3.35 0 0 0-.64.82V9.242h-1.712v11.553h1.729l-.017-5.134zm.53-1.138c.137.193.297.36.48.5l.155.11.053.034c.34.197.713.297 1.119.297.714 0 1.262-.225 1.645-.675.385-.46.576-1.048.576-1.762 0-.746-.192-1.338-.576-1.777-.372-.45-.92-.675-1.645-.675-.29 0-.569.053-.835.16a2.366 2.366 0 0 0-.284.136 1.99 1.99 0 0 0-.363.254 2.237 2.237 0 0 0-.46.569l-.082.162a2.56 2.56 0 0 0-.213 1.072v.115c0 .471.098.894.296 1.267l.135.211zm.964-.818a1.11 1.11 0 0 0 .367.385.937.937 0 0 0 .476.118c.423 0 .59-.117.687-.23.159-.194.28-.478.28-.95 0-.53-.133-.8-.266-.952l-.021-.025c-.078-.094-.231-.221-.68-.221a.995.995 0 0 0-.503.135l-.012.007a.859.859 0 0 0-.335.343c-.073.133-.132.324-.132.614v.115a1.43 1.43 0 0 0 .14.66zm15.7-6.222c.232-.23.346-.516.346-.856a1.053 1.053 0 0 0-.345-.79 1.175 1.175 0 0 0-.84-.329c-.34 0-.625.11-.855.33a1.053 1.053 0 0 0-.346.79c0 .34.115.625.346.855.23.23.516.346.856.346.34 0 .62-.115.839-.346zm4.337 9.314.033-1.332c.128.269.324.518.59.747l.098.081a3.727 3.727 0 0 0 .316.224l.223.122a3.21 3.21 0 0 0 1.44.322 3.785 3.785 0 0 0 1.875-.477 3.52 3.52 0 0 0 1.382-1.366c.352-.593.526-1.29.526-2.09 0-.79-.147-1.48-.444-2.073a3.235 3.235 0 0 0-1.283-1.399c-.549-.34-1.195-.51-1.942-.51a3.476 3.476 0 0 0-1.527.344l-.086.043-.165.09a3.412 3.412 0 0 0-.33.214c-.288.21-.507.446-.656.707a1.893 1.893 0 0 0-.099.198l.082-1.283V4.701h-1.744v12.095zm.473-2.509a2.482 2.482 0 0 0 .566.7c.078.065.159.125.245.18l.144.08a2.105 2.105 0 0 0 .975.232c.713 0 1.262-.225 1.645-.675.384-.46.576-1.053.576-1.778 0-.734-.192-1.327-.576-1.777-.373-.46-.921-.692-1.645-.692a2.18 2.18 0 0 0-1.015.235c-.147.075-.285.17-.415.282l-.15.142a2.086 2.086 0 0 0-.42.594c-.149.32-.223.685-.223 1.1v.115c0 .47.097.89.293 1.26zm2.616-.293c.157-.191.28-.479.28-.967 0-.51-.13-.79-.276-.961l-.021-.026c-.082-.1-.232-.225-.67-.225a.868.868 0 0 0-.681.279l-.012.011c-.154.155-.274.38-.274.807v.115c0 .285.057.499.144.669a1.13 1.13 0 0 0 .367.405c.137.082.28.123.455.123.423 0 .59-.118.686-.23zm8.266-3.013c.23-.087.472-.134.724-.14l.069-.002c.329 0 .542.033.642.099l.247-1.794c-.13-.066-.37-.099-.717-.099a2.3 2.3 0 0 0-.545.063 2.086 2.086 0 0 0-.411.148 2.18 2.18 0 0 0-.4.249 2.482 2.482 0 0 0-.485.499 2.659 2.659 0 0 0-.32.581l-.05.137v-1.48h-1.778v7.553h1.777v-3.884c0-.364.053-.678.159-.943a1.49 1.49 0 0 1 .466-.636 2.52 2.52 0 0 1 .399-.253 2.19 2.19 0 0 1 .224-.099zm9.784 2.656.05-.922c0-1.162-.285-2.062-.856-2.698-.559-.647-1.42-.97-2.584-.97-.746 0-1.415.163-2.007.493a3.462 3.462 0 0 0-1.4 1.382c-.329.604-.493 1.306-.493 2.106 0 .714.143 1.371.428 1.975.285.593.73 1.07 1.332 1.432.604.351 1.355.526 2.255.526.649 0 1.204-.062 1.668-.185l.044-.012.135-.04c.409-.122.736-.263.984-.421l-.542-1.267c-.2.108-.415.199-.642.274l-.297.087c-.34.088-.773.131-1.3.131-.636 0-1.135-.147-1.497-.444a1.573 1.573 0 0 1-.192-.193c-.244-.294-.415-.705-.512-1.234l-.004-.021h5.43zm-5.427-1.256-.003.022h3.752v-.138c-.007-.485-.104-.857-.288-1.118a1.056 1.056 0 0 0-.156-.176c-.307-.285-.746-.428-1.316-.428-.657 0-1.155.202-1.494.604-.253.3-.417.712-.494 1.234zm-27.053 2.77V4.7h-1.86v12.095h5.333V15.15zm7.103-5.908v7.553h-1.843V9.242h1.843z' fill='%23000' fill-opacity='.4' fill-rule='evenodd'/%3E%3Cpath d='m19.63 11.151-.757-1.71-.345 1.71-1.12 5.644h-1.827L18.083 4.7h.197l3.325 6.533.988 2.19.988-2.19L26.839 4.7h.181l2.6 12.095h-1.81l-1.218-5.644-.362-1.71-.658 1.71-2.93 5.644h-.098l-2.913-5.644zm14.836 5.81c-.68 0-1.311-.16-1.893-.478a3.795 3.795 0 0 1-1.381-1.382c-.34-.604-.51-1.306-.51-2.106 0-.79.147-1.482.444-2.074a3.364 3.364 0 0 1 1.3-1.382c.559-.33 1.217-.494 1.974-.494a3.293 3.293 0 0 1 1.234.231 3.341 3.341 0 0 1 .97.575c.264.22.44.439.527.659l.033-1.267h1.694v7.553H37.18l-.033-1.332c-.186.395-.526.746-1.02 1.053a3.167 3.167 0 0 1-1.662.444zm.296-1.482c.626 0 1.152-.214 1.58-.642.428-.44.642-1.01.642-1.711v-.115c0-.472-.098-.894-.296-1.267a2.211 2.211 0 0 0-.807-.872 2.098 2.098 0 0 0-1.119-.313c-.702 0-1.245.231-1.629.692-.384.45-.575 1.037-.575 1.76 0 .736.186 1.333.559 1.795.384.45.933.675 1.645.675zm6.521-6.237h1.711v1.4c.604-1.065 1.547-1.597 2.83-1.597 1.064 0 1.926.34 2.584 1.02.659.67.988 1.641.988 2.914 0 .79-.164 1.487-.493 2.09a3.456 3.456 0 0 1-1.316 1.399 3.51 3.51 0 0 1-1.844.493c-.636 0-1.19-.11-1.662-.329a2.665 2.665 0 0 1-1.086-.97l.017 5.134h-1.728V9.242zm4.048 6.22c.714 0 1.262-.224 1.645-.674.385-.46.576-1.048.576-1.762 0-.746-.192-1.338-.576-1.777-.372-.45-.92-.675-1.645-.675-.395 0-.768.098-1.12.296-.34.187-.613.46-.822.823-.197.351-.296.763-.296 1.234v.115c0 .472.098.894.296 1.267.209.362.483.647.823.855.34.197.713.297 1.119.297z' fill='%23fff'/%3E%3Cpath d='M51.325 4.7h1.86v10.45h3.473v1.646h-5.333zm7.12 4.542h1.843v7.553h-1.843zm.905-1.415a1.159 1.159 0 0 1-.856-.346 1.165 1.165 0 0 1-.346-.856 1.053 1.053 0 0 1 .346-.79c.23-.219.516-.329.856-.329.329 0 .609.11.839.33a1.053 1.053 0 0 1 .345.79 1.159 1.159 0 0 1-.345.855c-.22.23-.5.346-.84.346zm7.875 9.133a3.167 3.167 0 0 1-1.662-.444c-.482-.307-.817-.658-1.004-1.053l-.033 1.332h-1.71V4.701h1.743v4.657l-.082 1.283c.186-.438.548-.812 1.086-1.119a3.486 3.486 0 0 1 1.778-.477c.746 0 1.393.17 1.942.51a3.235 3.235 0 0 1 1.283 1.4c.297.592.444 1.282.444 2.072 0 .8-.175 1.498-.526 2.09a3.52 3.52 0 0 1-1.382 1.366 3.785 3.785 0 0 1-1.876.477zm-.296-1.481c.713 0 1.26-.225 1.645-.675.384-.46.577-1.053.577-1.778 0-.734-.193-1.327-.577-1.776-.373-.46-.921-.692-1.645-.692a2.115 2.115 0 0 0-1.58.659c-.428.428-.642.992-.642 1.694v.115c0 .473.098.895.296 1.267a2.385 2.385 0 0 0 .807.872 2.1 2.1 0 0 0 1.119.313zm5.927-6.237h1.777v1.481c.176-.505.46-.91.856-1.217a2.14 2.14 0 0 1 1.349-.46c.351 0 .593.032.724.098l-.247 1.794c-.099-.066-.313-.099-.642-.099-.516 0-.988.164-1.416.494-.417.329-.626.855-.626 1.58v3.883h-1.777V9.242zm9.534 7.718c-.9 0-1.651-.175-2.255-.526-.603-.362-1.047-.84-1.332-1.432a4.567 4.567 0 0 1-.428-1.975c0-.8.164-1.502.493-2.106a3.462 3.462 0 0 1 1.4-1.382c.592-.33 1.262-.494 2.007-.494 1.163 0 2.024.324 2.584.97.57.637.856 1.537.856 2.7 0 .296-.017.603-.05.92h-5.43c.12.67.356 1.153.708 1.45.362.296.86.443 1.497.443.526 0 .96-.044 1.3-.131a4.123 4.123 0 0 0 .938-.362l.542 1.267c-.274.175-.647.329-1.119.46-.472.132-1.042.197-1.711.197zm1.596-4.558c.01-.68-.137-1.158-.444-1.432-.307-.285-.746-.428-1.316-.428-1.152 0-1.815.62-1.991 1.86h3.752z' fill='%23e1e3e9'/%3E%3Cg fill-rule='evenodd' stroke-width='1.036'%3E%3Cpath d='m8.166 16.146-.002.002a1.54 1.54 0 0 1-2.009 0l-.002-.002-.043-.034-.002-.002-.199-.162H4.377a.657.657 0 0 0-.659.659v1.84a.657.657 0 0 0 .659.659h5.565a.657.657 0 0 0 .659-.659v-1.84a.657.657 0 0 0-.659-.659H8.411l-.202.164zm-1.121-.905a.29.29 0 0 0 .113.023.286.286 0 0 0 .189-.07l.077-.063c.634-.508 4.672-3.743 4.672-7.575 0-2.55-2.215-4.625-4.938-4.625S2.221 5.006 2.221 7.556c0 3.225 2.86 6.027 4.144 7.137h.004l.04.038.484.4.077.063a.628.628 0 0 0 .074.047zm-2.52-.548a16.898 16.898 0 0 1-1.183-1.315C2.187 11.942.967 9.897.967 7.555c0-3.319 2.855-5.88 6.192-5.88 3.338 0 6.193 2.561 6.193 5.881 0 2.34-1.22 4.387-2.376 5.822a16.898 16.898 0 0 1-1.182 1.315h.15a1.912 1.912 0 0 1 1.914 1.914v1.84a1.912 1.912 0 0 1-1.914 1.914H4.377a1.912 1.912 0 0 1-1.914-1.914v-1.84a1.912 1.912 0 0 1 1.914-1.914zm3.82-6.935c0 .692-.55 1.222-1.187 1.222s-1.185-.529-1.185-1.222.548-1.222 1.185-1.222c.638 0 1.186.529 1.186 1.222zm-1.186 2.477c1.348 0 2.442-1.11 2.442-2.478S8.507 5.28 7.159 5.28 4.72 6.39 4.72 7.758s1.092 2.477 2.44 2.477zm2.048 7.71H5.114v-.838h4.093z' fill='%23000' fill-opacity='.4'/%3E%3Cpath d='M2.222 7.555c0-2.55 2.214-4.625 4.937-4.625 2.723 0 4.938 2.075 4.938 4.625 0 3.832-4.038 7.068-4.672 7.575l-.077.063a.286.286 0 0 1-.189.07.286.286 0 0 1-.188-.07l-.077-.063c-.634-.507-4.672-3.743-4.672-7.575zm4.937 2.68c1.348 0 2.442-1.11 2.442-2.478S8.507 5.28 7.159 5.28 4.72 6.39 4.72 7.758s1.092 2.477 2.44 2.477z' fill='%23e1e3e9'/%3E%3Cpath d='M4.377 15.948a.657.657 0 0 0-.659.659v1.84a.657.657 0 0 0 .659.659h5.565a.657.657 0 0 0 .659-.659v-1.84a.657.657 0 0 0-.659-.659zm4.83 1.16H5.114v.838h4.093z' fill='%23fff'/%3E%3C/g%3E%3C/svg%3E");
            }
        }
        `;

        this.maplibreStyles4 = document.createElement("style");
        this.maplibreStyles4.textContent = `
        .mapboxgl-ctrl.mapboxgl-ctrl-attrib,
.maplibregl-ctrl.maplibregl-ctrl-attrib {
    background-color: hsla(0, 0%, 100%, 0.5);
    margin: 0;
    padding: 0 5px;
}
@media screen {
    .mapboxgl-ctrl-attrib.mapboxgl-compact,
    .maplibregl-ctrl-attrib.maplibregl-compact {
        background-color: #fff;
        border-radius: 12px;
        box-sizing: content-box;
        margin: 10px;
        min-height: 20px;
        padding: 2px 24px 2px 0;
        position: relative;
    }
    .mapboxgl-ctrl-attrib.mapboxgl-compact-show,
    .maplibregl-ctrl-attrib.maplibregl-compact-show {
        padding: 2px 28px 2px 8px;
        visibility: visible;
    }
    .mapboxgl-ctrl-bottom-left > .mapboxgl-ctrl-attrib.mapboxgl-compact-show,
    .mapboxgl-ctrl-top-left > .mapboxgl-ctrl-attrib.mapboxgl-compact-show,
    .maplibregl-ctrl-bottom-left > .maplibregl-ctrl-attrib.maplibregl-compact-show,
    .maplibregl-ctrl-top-left > .maplibregl-ctrl-attrib.maplibregl-compact-show {
        border-radius: 12px;
        padding: 2px 8px 2px 28px;
    }
    .mapboxgl-ctrl-attrib.mapboxgl-compact .mapboxgl-ctrl-attrib-inner,
    .maplibregl-ctrl-attrib.maplibregl-compact .maplibregl-ctrl-attrib-inner {
        display: none;
    }
    .mapboxgl-ctrl-attrib-button,
    .maplibregl-ctrl-attrib-button {
        background-color: hsla(0, 0%, 100%, 0.5);
        background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg width='24' height='24' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg' fill-rule='evenodd'%3E%3Cpath d='M4 10a6 6 0 1 0 12 0 6 6 0 1 0-12 0m5-3a1 1 0 1 0 2 0 1 1 0 1 0-2 0m0 3a1 1 0 1 1 2 0v3a1 1 0 1 1-2 0'/%3E%3C/svg%3E");
        border: 0;
        border-radius: 12px;
        box-sizing: border-box;
        cursor: pointer;
        display: none;
        height: 24px;
        outline: none;
        position: absolute;
        right: 0;
        top: 0;
        width: 24px;
    }
    .maplibregl-ctrl-attrib summary.maplibregl-ctrl-attrib-button {
        appearance: none;
        list-style: none;
    }
    .maplibregl-ctrl-attrib summary.maplibregl-ctrl-attrib-button::-webkit-details-marker {
        display: none;
    }
    .mapboxgl-ctrl-bottom-left .mapboxgl-ctrl-attrib-button,
    .mapboxgl-ctrl-top-left .mapboxgl-ctrl-attrib-button,
    .maplibregl-ctrl-bottom-left .maplibregl-ctrl-attrib-button,
    .maplibregl-ctrl-top-left .maplibregl-ctrl-attrib-button {
        left: 0;
    }
    .mapboxgl-ctrl-attrib.mapboxgl-compact .mapboxgl-ctrl-attrib-button,
    .mapboxgl-ctrl-attrib.mapboxgl-compact-show .mapboxgl-ctrl-attrib-inner,
    .maplibregl-ctrl-attrib.maplibregl-compact .maplibregl-ctrl-attrib-button,
    .maplibregl-ctrl-attrib.maplibregl-compact-show .maplibregl-ctrl-attrib-inner {
        display: block;
    }
    .mapboxgl-ctrl-attrib.mapboxgl-compact-show .mapboxgl-ctrl-attrib-button,
    .maplibregl-ctrl-attrib.maplibregl-compact-show .maplibregl-ctrl-attrib-button {
        background-color: rgb(0 0 0/5%);
    }
    .mapboxgl-ctrl-bottom-right > .mapboxgl-ctrl-attrib.mapboxgl-compact:after,
    .maplibregl-ctrl-bottom-right > .maplibregl-ctrl-attrib.maplibregl-compact:after {
        bottom: 0;
        right: 0;
    }
    .mapboxgl-ctrl-top-right > .mapboxgl-ctrl-attrib.mapboxgl-compact:after,
    .maplibregl-ctrl-top-right > .maplibregl-ctrl-attrib.maplibregl-compact:after {
        right: 0;
        top: 0;
    }
    .mapboxgl-ctrl-top-left > .mapboxgl-ctrl-attrib.mapboxgl-compact:after,
    .maplibregl-ctrl-top-left > .maplibregl-ctrl-attrib.maplibregl-compact:after {
        left: 0;
        top: 0;
    }
    .mapboxgl-ctrl-bottom-left > .mapboxgl-ctrl-attrib.mapboxgl-compact:after,
    .maplibregl-ctrl-bottom-left > .maplibregl-ctrl-attrib.maplibregl-compact:after {
        bottom: 0;
        left: 0;
    }
}
@media screen and (-ms-high-contrast: active) {
    .mapboxgl-ctrl-attrib.mapboxgl-compact:after,
    .maplibregl-ctrl-attrib.maplibregl-compact:after {
        background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg width='24' height='24' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg' fill-rule='evenodd' fill='%23fff'%3E%3Cpath d='M4 10a6 6 0 1 0 12 0 6 6 0 1 0-12 0m5-3a1 1 0 1 0 2 0 1 1 0 1 0-2 0m0 3a1 1 0 1 1 2 0v3a1 1 0 1 1-2 0'/%3E%3C/svg%3E");
    }
}
@media screen and (-ms-high-contrast: black-on-white) {
    .mapboxgl-ctrl-attrib.mapboxgl-compact:after,
    .maplibregl-ctrl-attrib.maplibregl-compact:after {
        background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg width='24' height='24' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg' fill-rule='evenodd'%3E%3Cpath d='M4 10a6 6 0 1 0 12 0 6 6 0 1 0-12 0m5-3a1 1 0 1 0 2 0 1 1 0 1 0-2 0m0 3a1 1 0 1 1 2 0v3a1 1 0 1 1-2 0'/%3E%3C/svg%3E");
    }
}
.mapboxgl-ctrl-attrib a,
.maplibregl-ctrl-attrib a {
    color: rgba(0, 0, 0, 0.75);
    text-decoration: none;
}
.mapboxgl-ctrl-attrib a:hover,
.maplibregl-ctrl-attrib a:hover {
    color: inherit;
    text-decoration: underline;
}
.mapboxgl-attrib-empty,
.maplibregl-attrib-empty {
    display: none;
}
.mapboxgl-ctrl-scale,
.maplibregl-ctrl-scale {
    background-color: hsla(0, 0%, 100%, 0.75);
    border: 2px solid #333;
    border-top: #333;
    box-sizing: border-box;
    color: #333;
    font-size: 10px;
    padding: 0 5px;
}
.mapboxgl-popup,
.maplibregl-popup {
    display: flex;
    left: 0;
    pointer-events: none;
    position: absolute;
    top: 0;
    will-change: transform;
}
.mapboxgl-popup-anchor-top,
.mapboxgl-popup-anchor-top-left,
.mapboxgl-popup-anchor-top-right,
.maplibregl-popup-anchor-top,
.maplibregl-popup-anchor-top-left,
.maplibregl-popup-anchor-top-right {
    flex-direction: column;
}
.mapboxgl-popup-anchor-bottom,
.mapboxgl-popup-anchor-bottom-left,
.mapboxgl-popup-anchor-bottom-right,
.maplibregl-popup-anchor-bottom,
.maplibregl-popup-anchor-bottom-left,
.maplibregl-popup-anchor-bottom-right {
    flex-direction: column-reverse;
}
.mapboxgl-popup-anchor-left,
.maplibregl-popup-anchor-left {
    flex-direction: row;
}
.mapboxgl-popup-anchor-right,
.maplibregl-popup-anchor-right {
    flex-direction: row-reverse;
}
.mapboxgl-popup-tip,
.maplibregl-popup-tip {
    border: 10px solid transparent;
    height: 0;
    width: 0;
    z-index: 1;
}
.mapboxgl-popup-anchor-top .mapboxgl-popup-tip,
.maplibregl-popup-anchor-top .maplibregl-popup-tip {
    align-self: center;
    border-bottom-color: #fff;
    border-top: none;
}
.mapboxgl-popup-anchor-top-left .mapboxgl-popup-tip,
.maplibregl-popup-anchor-top-left .maplibregl-popup-tip {
    align-self: flex-start;
    border-bottom-color: #fff;
    border-left: none;
    border-top: none;
}
.mapboxgl-popup-anchor-top-right .mapboxgl-popup-tip,
.maplibregl-popup-anchor-top-right .maplibregl-popup-tip {
    align-self: flex-end;
    border-bottom-color: #fff;
    border-right: none;
    border-top: none;
}
.mapboxgl-popup-anchor-bottom .mapboxgl-popup-tip,
.maplibregl-popup-anchor-bottom .maplibregl-popup-tip {
    align-self: center;
    border-bottom: none;
    border-top-color: #fff;
}
.mapboxgl-popup-anchor-bottom-left .mapboxgl-popup-tip,
.maplibregl-popup-anchor-bottom-left .maplibregl-popup-tip {
    align-self: flex-start;
    border-bottom: none;
    border-left: none;
    border-top-color: #fff;
}
.mapboxgl-popup-anchor-bottom-right .mapboxgl-popup-tip,
.maplibregl-popup-anchor-bottom-right .maplibregl-popup-tip {
    align-self: flex-end;
    border-bottom: none;
    border-right: none;
    border-top-color: #fff;
}
.mapboxgl-popup-anchor-left .mapboxgl-popup-tip,
.maplibregl-popup-anchor-left .maplibregl-popup-tip {
    align-self: center;
    border-left: none;
    border-right-color: #fff;
}
.mapboxgl-popup-anchor-right .mapboxgl-popup-tip,
.maplibregl-popup-anchor-right .maplibregl-popup-tip {
    align-self: center;
    border-left-color: #fff;
    border-right: none;
}
        `;
        this.maplibreStyles5 = document.createElement("style");
        this.maplibreStyles5.textContent = `
        .mapboxgl-popup-close-button,
        .maplibregl-popup-close-button {
            background-color: transparent;
            border: 0;
            border-radius: 0 3px 0 0;
            cursor: pointer;
            position: absolute;
            right: 0;
            top: 0;
        }
        .mapboxgl-popup-close-button:hover,
        .maplibregl-popup-close-button:hover {
            background-color: rgb(0 0 0/5%);
        }
        .mapboxgl-popup-content,
        .maplibregl-popup-content {
            background: #fff;
            border-radius: 3px;
            box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
            padding: 15px 10px;
            pointer-events: auto;
            position: relative;
        }
        .mapboxgl-popup-anchor-top-left .mapboxgl-popup-content,
        .maplibregl-popup-anchor-top-left .maplibregl-popup-content {
            border-top-left-radius: 0;
        }
        .mapboxgl-popup-anchor-top-right .mapboxgl-popup-content,
        .maplibregl-popup-anchor-top-right .maplibregl-popup-content {
            border-top-right-radius: 0;
        }
        .mapboxgl-popup-anchor-bottom-left .mapboxgl-popup-content,
        .maplibregl-popup-anchor-bottom-left .maplibregl-popup-content {
            border-bottom-left-radius: 0;
        }
        .mapboxgl-popup-anchor-bottom-right .mapboxgl-popup-content,
        .maplibregl-popup-anchor-bottom-right .maplibregl-popup-content {
            border-bottom-right-radius: 0;
        }
        .mapboxgl-popup-track-pointer,
        .maplibregl-popup-track-pointer {
            display: none;
        }
        .mapboxgl-popup-track-pointer *,
        .maplibregl-popup-track-pointer * {
            pointer-events: none;
            user-select: none;
        }
        .mapboxgl-map:hover .mapboxgl-popup-track-pointer,
        .maplibregl-map:hover .maplibregl-popup-track-pointer {
            display: flex;
        }
        .mapboxgl-map:active .mapboxgl-popup-track-pointer,
        .maplibregl-map:active .maplibregl-popup-track-pointer {
            display: none;
        }
        .mapboxgl-marker,
        .maplibregl-marker {
            left: 0;
            position: absolute;
            top: 0;
            will-change: transform;
        }
        .mapboxgl-user-location-dot,
        .maplibregl-user-location-dot {
            background-color: #1da1f2;
            border-radius: 50%;
            height: 15px;
            width: 15px;
        }
        .mapboxgl-user-location-dot:before,
        .maplibregl-user-location-dot:before {
            animation: maplibregl-user-location-dot-pulse 2s infinite;
            background-color: #1da1f2;
            border-radius: 50%;
            content: "";
            height: 15px;
            position: absolute;
            width: 15px;
        }
        .mapboxgl-user-location-dot:after,
        .maplibregl-user-location-dot:after {
            border: 2px solid #fff;
            border-radius: 50%;
            box-shadow: 0 0 3px rgba(0, 0, 0, 0.35);
            box-sizing: border-box;
            content: "";
            height: 19px;
            left: -2px;
            position: absolute;
            top: -2px;
            width: 19px;
        }
        @keyframes maplibregl-user-location-dot-pulse {
            0% {
                opacity: 1;
                transform: scale(1);
            }
            70% {
                opacity: 0;
                transform: scale(3);
            }
            to {
                opacity: 0;
                transform: scale(1);
            }
        }
        .mapboxgl-user-location-dot-stale,
        .maplibregl-user-location-dot-stale {
            background-color: #aaa;
        }
        .mapboxgl-user-location-dot-stale:after,
        .maplibregl-user-location-dot-stale:after {
            display: none;
        }
        .mapboxgl-user-location-accuracy-circle,
        .maplibregl-user-location-accuracy-circle {
            background-color: #1da1f233;
            border-radius: 100%;
            height: 1px;
            width: 1px;
        }
        .mapboxgl-crosshair,
        .mapboxgl-crosshair .mapboxgl-interactive,
        .mapboxgl-crosshair .mapboxgl-interactive:active,
        .maplibregl-crosshair,
        .maplibregl-crosshair .maplibregl-interactive,
        .maplibregl-crosshair .maplibregl-interactive:active {
            cursor: crosshair;
        }
        .mapboxgl-boxzoom,
        .maplibregl-boxzoom {
            background: #fff;
            border: 2px dotted #202020;
            height: 0;
            left: 0;
            opacity: 0.5;
            position: absolute;
            top: 0;
            width: 0;
        }
        .maplibregl-cooperative-gesture-screen {
            align-items: center;
            background: rgba(0, 0, 0, 0.4);
            bottom: 0;
            color: #fff;
            display: flex;
            font-size: 1.4em;
            justify-content: center;
            left: 0;
            line-height: 1.2;
            opacity: 0;
            padding: 1rem;
            pointer-events: none;
            position: absolute;
            right: 0;
            top: 0;
            transition: opacity 1s ease 1s;
        }
        .maplibregl-cooperative-gesture-screen.maplibregl-show {
            opacity: 1;
            transition: opacity 0.05s;
        }
        .maplibregl-cooperative-gesture-screen .maplibregl-mobile-message {
            display: none;
        }
        @media (hover: none), (max-width: 480px) {
            .maplibregl-cooperative-gesture-screen .maplibregl-desktop-message {
                display: none;
            }
            .maplibregl-cooperative-gesture-screen .maplibregl-mobile-message {
                display: block;
            }
        }
        `;

        shadow.appendChild(this.maplibreStyles1);
        shadow.appendChild(this.maplibreStyles2);
        shadow.appendChild(this.maplibreStyles3);
        shadow.appendChild(this.maplibreStyles4);
        shadow.appendChild(this.maplibreStyles5);
        shadow.appendChild(this.styles);

        // Attach the created element to the shadow DOM
        const app = document.getElementsByTagName('my-home-info');
        const mapWrapper = document.createElement('section');
        mapWrapper.id = 'map-wrapper';
        const mapContainer = document.createElement('article');
        mapContainer.id = 'map';
        mapWrapper.appendChild(mapContainer);
        const closeMapBtn = document.createElement('cod-button');
        closeMapBtn.addEventListener('click', (ev)=>{
            app[0].setAttribute('data-app-state', 'results');
        });
        closeMapBtn.setAttribute('data-primary', true);
        closeMapBtn.setAttribute('data-label', 'x');
        closeMapBtn.setAttribute('data-size', 'large');
        closeMapBtn.setAttribute('data-hover', false);
        closeMapBtn.setAttribute('data-background-color', 'color-3');
        closeMapBtn.setAttribute('data-img', '');
        closeMapBtn.setAttribute('data-img-alt', '');
        closeMapBtn.setAttribute('data-shape', 'square');
        shadow.appendChild(mapWrapper);
        mapWrapper.appendChild(closeMapBtn);
        this.map = new maplibregl.Map({
            container: mapContainer,
            style: mapStyle,
            center: [-83.1, 42.36],
            zoom: 9
        });
        app[0].setAttribute('data-map-state', 'init');
    }

    attributeChangedCallback(name, oldValue, newValue) {
        const app = document.getElementsByTagName('my-home-info');
        const parcel = JSON.parse(app[0].getAttribute('data-parcel-id'));
        const coord = [parcel.location.x, parcel.location.y];
        switch (name) {
            case 'data-map-state':
                this.map.addControl(new maplibregl.NavigationControl());
                this.map.on('style.load', () => {
                    this.map.resize();
                    const marker = new maplibregl.Marker()
                        .setLngLat(coord)
                        .addTo(this.map);
                    this.map.flyTo({
                        // These options control the ending camera position: centered at
                        // the target, at zoom level 9, and north up.
                        center: coord,
                        zoom: 12,
                        bearing: 0,

                        // These options control the flight curve, making it move
                        // slowly and zoom out almost completely before starting
                        // to pan.
                        speed: 1.5, // make the flying slow
                        curve: 1, // change the speed at which it zooms out

                        // This can be any easing function: it takes a number between
                        // 0 and 1 and returns another number between 0 and 1.
                        easing: function (t) {
                            return t;
                        },

                        // this animation is considered essential with respect to prefers-reduced-motion
                        essential: true
                    });
                    const app = document.getElementsByTagName('my-home-info');
                    const apiData = JSON.parse(app[0].getAttribute('data-api-active-datasets'));
                    const mapData = app[0].getAttribute('data-map-active-data');
                    this.map.addSource("data-points", {
                        type: "geojson",
                        data: apiData[mapData].data
                    });
                    this.map.addLayer({
                        id: "data-points",
                        type: "circle",
                        source: "data-points",
                        paint: {
                            "circle-radius": {
                                base: 5,
                                stops: [
                                    [12, 5],
                                    [22, 120],
                                ],
                            },
                            "circle-color": "#004544",
                        },
                    });
                });
                // Creating this temp variable for workaround with dealing with "this" encapsulation
                const tempMap = this;
                this.map.on('click', 'data-points', function (e) {
                    const app = document.getElementsByTagName('my-home-info');
                    const mapData = app[0].getAttribute('data-map-active-data');
                    tempMap.buildPointData(mapData, e.features[0], tempMap, e);

                });
                this.map.on('mouseenter', 'data-points', function () {
                    tempMap.map.getCanvas().style.cursor = 'pointer';
                });

                // Change it back to a pointer when it leaves.
                this.map.on('mouseleave', 'data-points', function () {
                    tempMap.map.getCanvas().style.cursor = '';
                });
                break;

            default:
                break;
        }
    }

    buildPointData(dataType, data, map, e) {
        switch (dataType) {
            case 'schools':
                new maplibregl.Popup()
                    .setLngLat(e.lngLat)
                    .setHTML(`<strong>School Name:</strong> ${e.features[0].properties.EntityOfficialName}`)
                    .addTo(map.map);
                break;

            case 'demos-data':
                new maplibregl.Popup()
                    .setLngLat(e.lngLat)
                    .setHTML(`<strong>Demo Address:</strong> ${e.features[0].properties.address}`)
                    .addTo(map.map);
                break;

            case 'stabilization-data':
                new maplibregl.Popup()
                    .setLngLat(e.lngLat)
                    .setHTML(`<strong>Stabilization Address:</strong> ${e.features[0].properties.address}`)
                    .addTo(map.map);
                break;

            case 'improve-det':
                new maplibregl.Popup()
                    .setLngLat(e.lngLat)
                    .setHTML(`<strong>Issue type:</strong> ${e.features[0].properties.request_type_title}`)
                    .addTo(map.map);
                break;

            default:
                break;
        }
    }
}
