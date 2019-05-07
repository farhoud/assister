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
                "extends": {
                    "@id": "tfx:extends",
                    "@type": "@id",
                },
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
                "examples": {
                    "@id": "tfx:example",
                    "@container": "@set",
                    "@type": "schema:Text"
                },
                "execution": {
                    "@id": "tfx:execution",
                    "@container": "@id",
                },
                "functions": {
                    "@id": "tfx:function",
                    "@container": "@id",
                },
                "type": {
                    "@id": "tfx:type",
                    "@type": "@id",
                },
                "variables": {
                    "@id": "tfx:variable",
                    "@container": "@id",
                },
                "commands": {
                    "@id": "tfx:command",
                    "@container": "@id",
                },
                "term": {
                    "@id": "tfx:term",
                    "@type": "@id",
                },
                "map": {
                    "@id": "tfx:map",
                    "@type": "schema:StructuredValue",
                },
                "intent": {
                    "@id": "tfx:intent",
                    "@type": "schema:StructuredValue",
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
                            "pattern": "${'A':'Z' 1:N}"
                        }
                    ]
                },
                "sheet/terms/range": {
                    "name": "range",
                    "description": "A ${range} is an (interval)[https://en.wikipedia.org/wiki/Interval_(mathematics)] of ${cell}s with a ${start} and an ${end}",
                    "more": "https://www.computerhope.com/jargon/r/range.htm",
                    "terms": {
                        "sheet/terms/range/start": {
                            "name": "start",
                            "extends": "sheet/terms/cell"
                        },
                        "sheet/terms/range/end": {
                            "name": "end",
                            "extends": "sheet/terms/cell"
                        }
                    },
                    "cases": [
                        {
                            "pattern": "${start ':' end}"
                        }
                    ]
                },
                "sheet/terms/selection": {
                    "name": "selection",
                    "cases": [
                        {
                            "pattern": "${((cell ',') | (range ',')) ... cell | range}",
                            "examples": [
                                "A1",
                                "J9:K14,L9,M9,N9:O14,K17:N25"
                            ]
                        }
                    ]
                },
            }
        }
    },

    "execution": {
        "sheet.js": {
            "functions": {
                "sheet/functions/format": {
                    "name": "format"
                },
                "sheet/functions/setCurrentSelection": {
                    "name": "setCurrentSelection"
                }
            },
            "variables": {
                "sheet/variables/type": {
                    "name": "type"
                },
                "sheet/variables/currentSelection": {
                    "name": "currentSelection"
                }
            }
        }
    },

    "commands": {
        "sheet/commands/format": {
            "variables": {
                "sheet/commands/format/selection": {
                    "name": "selection",
                    "term": "sheet/terms/selection"
                },
                "sheet/commands/format/type": {
                    "name": "type",
                    "term": "sheet/terms/type",
                    "map": "type => types[type]"
                }
            },
            "cases": [
                {
                    "pattern": "format as ${type}",
                    "intent": "format(currentSelection, type)"
                },
                {
                    "pattern": "format ${selection} as ${type}",
                    "intent": "format(selection, type)"
                }
            ]
        }
    }
};

const stringify = value => JSON.stringify(value, null, 2);
const print = value => console.log(stringify(value));
jsonld.expand(commands).then(print);
// jsonld.compact(commands, context).then(print);
jsonld.toRDF(commands, { format: 'application/n-quads' }).then(console.log);
