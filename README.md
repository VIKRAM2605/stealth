# Greedy

A top-down 2D heist game where you steal orbs against the clock - but every orb you grab makes you heavier and slower. Don't be
greedy. The clock is always Ticking.

*(Note: Use the Arrow Keys or WASD to move the character.)*
*(Note: Watch the timer Bar constantly and plan the route.)*
*(Note: The Heavier you get, The slower you move. Don't collect so much that you can't reach the exit.)*
*(Note: Buy upgrades to help you get more orbs. Stratigekly plan it out.)*
*(Note: The Exit is Marked by the Harzadous Tape cross it to move to the next level)*

---

## The Core Functionality Of The Game

Each Level starts with 20 seconds(base time) and as soon as the game starts to play the time will tick. You can see remaining time in the red bar places at top center of the map.
Orbs are scattered all over the map kinda like coins you need to collect the orbs to earn orb money that is needed to buy the upgrades.
Each Orb you gather adds weight to the player. The more you collect the more the player will get slowed down. There is a buffer so that you can't go slower than it.
Upgrades will help you collect the orbs much easier. Down below i have explained it clearly.
Portal are spawned in some levels which help you teleport the player from one portal to the another.
Laser are spawned at some level they will stun you if they are not turned off.

---

## Time Bar
The game starts with 20 seconds(base time). Whenever you buy a timeSurge upgrade it will add extra 1 seconds to the timer.
if you bought 1 timeSurge the total time for the next run is 21 seconds.

---

## Time Surge Upgrade
Adds 1 second to the base Time of the level(stacks).

---

## Strength Surge Upgrade
Reduce Half of one's orb weigth per upgrade you bought. SO if you bought 2 strength surge you can carry a orb without getting slowed down.

---

## Stun Break
Reduce the time of the stun when getting zapped by the laser by 5% of current stun time.

---

## Orb Magnet
Increase the Area(in circle) So when player gets in the circle the orb will get instanlty collected without the needing to get closer to it. Per upgrade you buy it increases the current area size by 8%.

---

## About Laser
Lasers will be spawned at some levels. You can't pass through the laser if you try to do so you will get stunned for 2 seconds and get knocked back. The on state of the laser can be visually seen as Blue. To turn off the laser step on the button next to the laser and the laser will get turned off. No blue light from the laser.

---

## About the Portal
Portals are spawned through the level and to teleport from one portal to another you need to stand on one of the portal.
The destination is predefined you can't change where to teleport. The teleportation takes 2 seconds and can be visually seen how the portals react when you step on it. There is a cooldown period so when you get teleported from one portal to another you have to wait 1 seconds for the next teleportation to start.

---

## What Happens When I Finish All The Level
The Game will loops from level 1 if you managed to complete all the levels. So at this time try to collect all the orbs from all the levels without running out of time.

---

## What Happens After You Die
when you die due to insufficient Time. All the upgrades that you have bought will get zeroed so you start freshly.