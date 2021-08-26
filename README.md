# Meteor Globe

A web application for visualizing real meteors detected by the [Global Meteor Network](https://globalmeteornetwork.org/) cameras in 3D

At the moment it shows a static representation of the meteors detected and triangulated in the last day, downloaded from  
https://globalmeteornetwork.org/data/traj_summary_data/daily/traj_summary_yesterday.txt

## The Future

In no particular order...

-   UI for choosing the data
-   Selected meteor info
-   Filter by detecting stations, meteor shower, time etc
-   Animated replay
-   Orbit paths
-   Proper sunlight
-   Free camera control

## Notes

The globe is a perfect sphere. At some point it will be the WGS84 ellipsoid for correctness, but I doubt it will make much visual difference.
