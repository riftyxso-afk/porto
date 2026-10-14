// What is left in this file is everything the two languages share: the things a
// translation cannot change. Every sentence the reader sees moved into the
// dictionaries, so a language switch cannot miss a string that happened to live
// next to a URL.
//
// `id` is the join key. Each one points at a matching entry in the dictionary
// (t.building[id], t.projects.categories[id], t.projects.descriptions[id]), so
// adding a project means adding an id here and its two strings there.

// What is being built right now. Both are live products with a public URL.
export const currentlyBuilding = [
  {
    id: "portalink",
    title: "Portalink",
    href: "https://portalink.cloud",
  },
  {
    id: "whip",
    title: "Whip",
    href: "https://whip-app-697.netlify.app",
  },
] as const;

// Shipped and in-progress work. `href` is null where there is nothing to link
// to yet, which renders the row without an arrow rather than as a link to "#".
export const projectList = [
  {
    id: "portalink",
    title: "Portalink",
    href: "https://portalink.cloud",
  },
  {
    id: "whip",
    title: "Whip",
    href: "https://whip-app-697.netlify.app",
  },
  {
    id: "soil",
    title: "Soil Moisture Monitoring System",
    href: null,
  },
] as const;