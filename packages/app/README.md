# Commerce Layer App Webhooks

The Commerce Layer webhooks application (React) provides you with a simple GUI to handle [webhooks](https://docs.commercelayer.io/core/real-time-webhooks).

<img width="565" alt="Webhooks" src="https://user-images.githubusercontent.com/105653649/220582409-2854c350-d977-4787-8514-e70b58af0a16.png">

## What is Commerce Layer?

[Commerce Layer](https://commercelayer.io) is a multi-market commerce API and order management system that lets you add global shopping capabilities to any website, mobile app, chatbot, wearable, voice, or IoT device, with ease. Compose your stack with the best-of-breed tools you already mastered and love. Make any experience shoppable, anywhere, through a blazing-fast, enterprise-grade, and secure API.

## Table of contents

- [Getting started](#getting-started)
- [Environments](#environments)
- [Help and support](#need-help)
- [License](#license)

---

## Getting started

1. First, install dependencies and run the development server:

```
pnpm install
pnpm dev
```

2. Set your environment with `.env.local` starting from `.env.local.sample`.

3. Configure your `/public/config.local.js` with the runtime configuration required

4. Open [http://localhost:5173](http://localhost:5173) with your browser to see the result. You can use the following format to open the app: `http://localhost:5173/webhooks?accessToken=<your-access-token>`

## Environments

Configure environment variables in your `.env`, `.env.local` or `.env.production` file as followings:

| Var name            | Sample vaule | Description                                                                                                                                                                                                                                                          |
| ------------------- | ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| PUBLIC_TOKEN_KIND   | integration  | (Optional) Defines the kind of token to be used and validated. <br />Possible values: `integration` or `webapp`. <br />Default value is `webapp`.                                                                                                                    |
| PUBLIC_PROJECT_PATH | webhooks      | (Optional) Defines the base root path where the app will be served.<br/> `https://<slug>.commercelayer.app/<PUBLIC_PROJECT_PATH>`<br /> It's used at build time to reference assets folder and at runtime as base router path. <br />No leading or trailing slashes. |

## Need help?

1. Join [Commerce Layer's Slack community](https://slack.commercelayer.app).

2. Create an [issue](https://github.com/commercelayer/app-webhooks/issues) in this repository.

3. Ping us [on Twitter](https://twitter.com/commercelayer).

## License

This repository is published under the [MIT](LICENSE) license.
