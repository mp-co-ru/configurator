# Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Launching

For debugging, it will be necessary to install several dependencies and use the VSCode code editor.
List of dependencies:

Git
Node >= 21.0
Yarn >= 1.22.21
Dependencies can be installed on GNU/Linux using the package manager apt or apt-get.
Node could be updated using command nvm install node

Dependencies can be installed on MacOS using the package manager brew.

1. Clone the configurator project.
   To do this, go to the terminal. Next, using the command
   cd <path to directory>
   move to the location where we want to place the configurator project.
   Execute the command
   git clone https://github.com/mp-co-ru/configurator.git

2. Move to the project's root directory using the command cd configurator.

3. Execute the command yarn install.
   .. note::
   Installing all necessary packages may take some time.

4. Execute the command yarn dev.
   Messages like the following should appear on the terminal screen:

   VITE v_._._ ready in ___ ms

   ➜  Local:   http://localhost:5173/

   ➜  Network: use --host to expose

   ➜  press h for help

5. You can modify the source code of the project, and the changes will automatically
   be reflected in the configurator in debug mode.


## Type Support For `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
   1. Run `Extensions: Show Built-in Extensions` from VSCode's command palette
   2. Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.
