# Discovery Schema

Discovery service responses following [the MFWG schema specification](https://github.com/awslabs/frontend-discovery) are directly supported.

::: tip
Follow the JSON schema defined in the linked [GitHub repository](https://github.com/awslabs/frontend-discovery/blob/main/schema/v1-pre.json) for making your own discovery service compatible with Picard.
:::

## Schema Description

The returned response has either to be an object with a property named `microFrontends`, which is an object again - consisting of a mapping of names of micro frontends to their different definitions (i.e., one or more definitions per version).

## Format Detection

The format of each entry is determined in this order:

1. `extras.pilet.spec` set to `mf` means Module Federation, and `nf` means Native Federation. The Piral Cloud Feed Service uses this form.
2. Any other `extras.pilet` section means a pilet.
3. A `url` ending with `.js`, or an `extras.modulefederation` section, means Module Federation.
4. A `url` ending with `.json`, or an `extras.nativefederation` section, means Native Federation.
5. Otherwise, Module Federation is assumed.

Relative URLs are resolved against the URL of the discovery service. If the response is passed in as an object or returned from a function, they're resolved against the page.

## Mapping of Properties

### Module Federation

To be recognized as a micro frontend using Module Federation the entry needs to have a section `modulefederation` placed on `extras` of the definition. Alternatively, if the URL ends with `.js` and no other type has been recognized Picard.js will fall back to Module Federation.

| Property                  | Description                                         |
| ------------------------- | --------------------------------------------------- |
| `[key]`                   | Name of the micro frontend                          |
| `[value]`                 | The micro frontend definition                       |
| `def.url`                 | Link to the remote entry manifest                   |
| `def.extras.id`           | The global name of the remote                       |
| `def.extras.metaData`     | The `metaData` section of the remote entry manifest |
| `def.extras.exposes`      | The `exposes` section of the remote entry manifest  |
| `def.extras.remotes`      | The `remotes` section of the remote entry manifest  |
| `def.extras.shared`       | The `shared` section of the remote entry manifest   |
| `def.extras.runtime`      | The MF runtime version (e.g., `1.0` or `2.0`)       |
| `def.extras.type`         | The type (`esm` / `module` or `var` / `global`)     |

::: warning
It is crucial that the right runtime version of Module Federation is transported. While a missing `runtime` value could still be inferred correctly, an incorrect one will almost certainly lead to a wrong interpretation of the micro frontend.
:::

### Native Federation

To be recognized as a micro frontend using Native Federation the entry needs to have a section `nativefederation` placed on `extras` of the definition.

| Property                  | Description                                         |
| ------------------------- | --------------------------------------------------- |
| `[key]`                   | Name of the micro frontend                          |
| `[value]`                 | The micro frontend definition                       |
| `def.url`                 | Link to the remote entry JSON                       |
| `def.extras.exposes`      | The `exposes` section of the remote entry JSON      |
| `def.extras.dependencies` | The `dependencies` section of the remote entry JSON |

### Pilets

To be recognized as a micro frontend using Piral (i.e., a pilet) the entry needs to have a section `pilet` placed on `extras` of the definition.

| Property                  | Description                                         |
| ------------------------- | --------------------------------------------------- |
| `[key]`                   | Name of the micro frontend                          |
| `[value]`                 | The micro frontend definition                       |
| `def.url`                 | Link to the entry module                            |
| `def.extras.dependencies` | The `dependencies` section of pilet                 |
| `def.extras.config`       | The `config` section of the pilet                   |
| `def.extras.pilet.spec`   | The `spec` section of the pilet                     |
| `def.version`             | The `version` of the pilet                          |
| `def.integrity`           | The `integrity` section of the pilet                |

### Anything Else

**This is not supported** (right now).

All values in the discovery schema are interepreted as one of the previously three mentioned formats. If you know another format that can be / is transported commonly then let us know!
