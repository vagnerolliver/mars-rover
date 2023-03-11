#!/bin/sh

## 1) load all the keys from the .env file in order to know which env vars should be replaced
DOT_ENV_FILE=.env
ENV_VARS_TO_REPLACE=$(sed '/^\s*$/d' $DOT_ENV_FILE | sed '/^#.*/d' | sed -E 's/(.*)=(.*)/\1/')
echo "ENV VARS TO BE REPLACED:"
echo $ENV_VARS_TO_REPLACE

## 2) iterate all the app.*.js files to replace the placeholders
#for file in ./build/static/js/*.js;
for file in /opt/app/assets/*.js;
do
  echo "Processing $file ...";

  ## 3) iterate over all the variables to replace them on the file with the runtime values
  for i in $ENV_VARS_TO_REPLACE
  do
    ENV_VAR_NAME=$i
    ENV_VAR_VALUE=`printenv $ENV_VAR_NAME`
    if [ -z "$ENV_VAR_VALUE" ]
    then
        ENV_VAR_VALUE="ENV_VAR_NOT_FOUND_\$${ENV_VAR_NAME}"
    fi
    echo "substituting \$$ENV_VAR_NAME with $ENV_VAR_VALUE ..."
    sed -i "s|\${*$i}*|$ENV_VAR_VALUE|g" $file
  done

done

## 4) Finally, start server
http-server-spa app index.html 80