# The Brewery Finder
Welcome beer enthusiast, and welcome to [The Brewery Finder](https://the-brewery-finder.vercel.app/)! The Brewery Finder is a web application built using Typescript, Next.js, Redux Toolkit, RTK Query, Chakra UI, Framer-motion, and Mapbox. It leverages the OpenBreweryDB API to query breweries and also uses Supabase to build its backend.

## Check it out!
[The Brewery Finder](https://the-brewery-finder.vercel.app/)

<img width="500" alt="Homepage" src="https://user-images.githubusercontent.com/63180403/229860856-a4c0f423-aa00-47b3-801d-261fc5b61f3e.png">
<img width="500" alt="Map page" src="https://user-images.githubusercontent.com/63180403/229860900-656ca818-dad5-4a92-a648-4466c5e87ed5.png">


## Prerequisites
Before running the application, make sure you have the following installed:
- **Node.js**
- **NPM** or **Yarn**
- A valid **Mapbox API key**

## Getting Started
1. Clone the repository

2. Install dependencies by running npm install or yarn

3. Create a .env.local file at the root of the project and add your Mapbox API key as follows:

``NEXT_PUBLIC_MAPBOX_API_KEY=<your Mapbox API key>``

4. Start the development server by running npm run dev or yarn dev

5. Navigate to http://localhost:3000 to see the application running.

## Features
The Brewery Finder allows users to:

* Search for breweries by name or location
* Rate brewery and write a review
* View details about each brewery, including its address, website, etc...
* View breweries on a map

## API

The Brewery Finder uses the following APIs:

- [OpenBreweryDB API](https://www.openbrewerydb.org/) for brewery data
- [Supabase](https://supabase.io/) for backend services

## Credits

The Brewery Finder was developed by Sam Kim. It was built using the following technologies:

- [Typescript](https://www.typescriptlang.org/)
- [Next.js](https://nextjs.org/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [RTK Query](https://redux-toolkit.js.org/rtk-query/overview)
- [Chakra UI](https://chakra-ui.com/)
- [Framer-motion](https://www.framer.com/motion/)
- [Mapbox](https://www.mapbox.com/)
- [OpenBreweryDB API](https://www.openbrewerydb.org/)
- [Supabase](https://supabase.io/)

## License

The Brewery Finder is licensed under the [MIT License](https://opensource.org/licenses/MIT).
