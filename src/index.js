import MyHomeInfo from './components/MyHomeInfo';
customElements.define('my-home-info', MyHomeInfo);

import * as Sentry from "@sentry/browser";

Sentry.init({
    dsn: "https://536fad340d72a07ee08fe3df749b982e@o4505717305704448.ingest.sentry.io/4505720878792704",

    // Alternatively, use `process.env.npm_package_version` for a dynamic release version
    // if your build tool supports it.
    release: "local-services-lookup@2.0.9",
    integrations: [new Sentry.BrowserTracing(), new Sentry.Replay()],

    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,

    // Set `tracePropagationTargets` to control for which URLs distributed tracing should be enabled
    tracePropagationTargets: ["localhost", /^https:\/\/detroitmi\.gov/],

    // Capture Replay for 10% of all sessions,
    // plus for 100% of sessions with an error
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
});