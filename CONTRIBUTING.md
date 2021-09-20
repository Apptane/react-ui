# Contributing

## Releasing new version

1. Run `pnpm changeset` in the root of the repository and select packages to include in the release and what version bump to introduce.
2. Commit the changes and the resulting changeset file.
3. Run `pnpm changeset version` to generate changelog files and update package version. This step removes previous changeset file.
4. Run `pnpm install` to update references.
5. Commit the changes as `Version packages`.
6. Run `pnpm build` to build packages.
7. Run `pnpm publish-pkg` to publish packages.
