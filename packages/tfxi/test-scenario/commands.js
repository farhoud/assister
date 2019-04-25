const jsonld = require('jsonld');

const context = {
    "@context": [
        {
            "@context": {
                "@version": 1.1,
                "@base": "http://intent.land/tfx/0.0.1/",
                "tfx": "http://intent.land/tfx/0.0.1/",
                "schema": "http://schema.org/",
                "name": {
                    "@id": "tfx:name",
                    "@type": "schema:name",
                },
                "description": "tfx:description",
                "command": "tfx:command",
                "terminology": {
                    "@id": "tfx:terminology",
                    "@container": "@id",
                },
                "terms": {
                    "@id": "tfx:term",
                    "@container": "@id",
                },
                "cases": {
                    "@id": "tfx:case",
                    "@container": "@set"
                },
                "pattern": {
                    "@id": "tfx:pattern",
                    "@type": "schema:StructuredValue"
                },
            },
            "@id": "./",
            "@graph": [
                {
                    "@id": "name",
                    "@type": "schema:Property",
                    "schema:domainIncludes": ["tfx:term", "tfx:command"],
                    "schema:rangeIncludes": "schema:name"
                },
                {
                    "@id": "command",
                    "@type": "schema:DefinedTerm"
                },
                {
                    "@id": "terms",
                    "@type": "schema:DefinedTermSet"
                },
                {
                    "@id": "term",
                    "@type": "schema:DefinedTerm"
                },
                {
                    "@id": "case",
                    "@type": "schema:Property",
                    "schema:domainIncludes": ["tfx:term", "tfx:command"],
                    "schema:rangeIncludes": "schema:StructuredValue"
                },
                {
                    "@id": "description",
                    "@type": "schema:description",
                    "schema:domainIncludes": ["tfx:term", "tfx:command"],
                    "schema:rangeIncludes": "schema:StructuredValue"
                }
            ]
        },
        {
            "@base": "http://assister.ai/demo/"
        }
    ]
};

const commands = {
    ...context,
    "@id": "./",
    "commands": "sheet/commands",
    "terminology": {
        "sheet/terms": {
            "terms": {
                "sheet/terms/type": {
                    "name": "type",
                    "cases": [
                        {
                            "pattern": "number"
                        },
                        {
                            "pattern": "date"
                        },
                    ]
                },
                "sheet/terms/cell": {
                    "name": "cell",
                    "cases": [
                        {
                            "pattern": "${'A':'Z' 0:N}"
                        }
                    ]
                },
            }
        }
    }
};

const stringify = value => JSON.stringify(value, null, 2);
const print = value => console.log(stringify(value));
jsonld.expand(commands).then(print);
// jsonld.compact(commands, context).then(print);
jsonld.toRDF(commands, { format: 'application/n-quads' }).then(console.log);
