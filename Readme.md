# Customisable Cookbook

Recipes are stored on [vercel KV](https://vercel.com/docs/storage/vercel-kv) (Redis Storage) in json format like this. see type [Recipe](./src/types/Recipe.d.ts) 
```
{
  "ingredients": [
    "pasta",
    "pecorino",
    "parmesan",
    "eggs",
    "very cold sparkling water",
    "white wine",
    "guanciale / pancetta"
  ],
  "steps": [
    {
      "label": "Fry guanciale / pancetta",
      "skippable": false,
      "children": [{ "label": "Until very brown" }]
    },
    {
      "label": "Deglaze with white wine",
      "skippable": true,
      "children": [{ "label": "skip if meat is good" }]
    },
    {
      "label": "Add very cold sparkling water",
      "skippable": false
    },
    {
      "label": "Add eggs, pecorino, parmesan",
      "skippable": false,
      "children": [{ "label": "mix well" }]
    },
    {
      "label": "Add pasta",
      "children": [
        { "label": "low heat and keep everything moving until squishy sauce" }
      ]
    }
  ]
}
```

Uploaded with redis cli:
`redis-cli --tls -u redis://******:*****@creative-mite-33542.kv.vercel-storage.com:33542 -x SET mattar-paneer < ./public/recipe/mattar-paneer.json`