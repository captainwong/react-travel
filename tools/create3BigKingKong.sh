#!/bin/bash

path=$1

if [[ $# -eq 2 ]]; then
  name=$2
else
  name=`basename ${path}`
  name=${name^}
fi

mkdir -p ${path}
touch ${path}/${name}.tsx
touch ${path}/${name}.module.css
touch ${path}/index.ts

printf 'import React from "react";\nimport styles from "./%s.module.css";\n\nexport const %s : React.FC = () => {\n  return (\n    <>\n    </>\n  );\n}\n' ${name} ${name} >> ${path}/${name}.tsx

printf 'export * from "./%s";\n' ${name} >> ${path}/index.ts

parentIndex=`dirname ${path}`/index.ts
folder=$(basename $path)
if [ -f ${parentIndex} ]; then
  printf 'export * from "./%s";\n' ${folder} >> ${parentIndex}
fi
