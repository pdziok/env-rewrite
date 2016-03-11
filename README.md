# Environment Variables Rewriter

## Why

To break direct dependency between application and it's run environment

## Example

Running application or heroku and using add-ons causes adding Heroku Config Vars. 
Those Vars become Environment Variables within running dyno.

Heroku Vars are usually prefixed with add-on alias causing app to use
runtime configuration values.

Some of addons aliases cannot be changed.

### TL;DR

Heroku addon Elastic Cloud provides env `FOUNDELASTICSEARCH_URL`. 
Bonsai Elastic Search addon provides `BONSAI_URL`.
  
Changing one addon to another require application changes.

## Usage

Based on example given above:

Run your app with additional Environment Variable `REWRITE_ENV`

```shell
export REWRITE_ENV=ELASTICSEARCH_URL:FOUNDELASTICSEARCH_URL
```

Inside your application before rewrite envs before using any of them (preferably in the begging of the entrypoint)

```javascript
require('env-rewrite').rewrite()
```

Now `ELASTICSEARCH_URL` env has value of `FOUNDELASTICSEARCH_URL`;

### Multiple rewrites

Separate rewrite directives with a comma (`,`). Example:

```shell
export REWRITE_ENV=ELASTICSEARCH_URL:FOUNDELASTICSEARCH_URL,ES_URL:FOUNDELASTICSEARCH_URL
```

### Chaning

Values are rewrited one after another which enables rewrite chain.

```shell
export REWRITE_ENV=ELASTICSEARCH_URL:FOUNDELASTICSEARCH_URL,ES_URL:ELASTICSEARCH_URL
```
