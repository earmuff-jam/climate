# PropertyCo Application

![Build Status](https://travis-ci.org/klugjo/hexo-autolinker.svg?branch=master)
[![License][license-image]][license]

<img 
src="https://picsum.photos/400"
alt=" random generated image for propertyCo" 
title="Peek-LastWeek" 
align="right" 
width="400px" 
height="400px" 
/>

**PropertyCo Application** primary purpose is to allow cross communication between property owners and renters allowing transparency between work and communication. Currently it is still Work in Progress.

## Installation Guide

The application runs currently on NextJs Platform with Vercel as its deployment tool. It uses Javascript in the front end to render data and Supabase in the backend to store the application data.

Users should not have to install any 3rd party libraries. Users who are using the World Wide Web should simply start the application by entering their email address and password and by pressing `Sign Up`.

### Note

The toolkits that are in use are -

1. supabase
2. chartjs "^0.3.24"
3. react "18.2.0"
4. react-dom "18.2.0"
5. react-base-table "^.1.13.4"
6. swr library for nextjs "^1.3.0"
7. material ui v5.
8. nextjs "13.0.5"
9. chart.js "^4.2.1"
10. memory-cache "^0.2.0",
11. lodash "^4.17.21",


## Note `Cache in Use`

We are currently using `Memory Cache` as a tool to cache memory for a certain duration of time. This is currently being used where - 

1. Property Owners can add new Property. ( Current caching hours - 12)



## `Developer Pain Points`

1. Some of the common pain point is yarn failing its dependencies. We can try to resolve that by using the following commands.

```
rm -rf node_modules
yarn cache clean
yarn
yarn start
```

2. Sometimes the typescript server needs to be refreshed. Follow the following steps.

```
crtl + shft + p ( windows ) || cmd + shft + p (mac)
type in `restart ts server`

```

## Copyright and License

Copyright @ 2020.

Licensed under the **[MIT LICENSE][license]**
you may not use this software except in compliance with the License.

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

[license-image]: http://img.shields.io/badge/license-Apache--2-blue.svg?style=flat
[license]: https://www.mit.edu/~amini/LICENSE.md
