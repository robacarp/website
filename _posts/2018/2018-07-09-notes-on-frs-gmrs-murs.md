---
title: Notes on FRS, GMRS, MURS radios
date: 2018-07-08 21:07:07
tags: sdr radio gmrs frs
layout: post
guid: 0962dfe0-dfec-466c-a2cb-024238526812
---

### FRS

- Modulation: FM
- 2.5 kHz deviation (Narrow band)
- 12.5kHz channel spacing
- Detachable antenna not allowed, limiting usable range

### GMRS

- Modulation: FM
- 2.5 kHz or 5 kHz deviation
- 12.5 kHz channel spacing
- GMRS license and Call sign required:
  - Identified at least every 15 min, and at end of transmission series
  - Morse or spoken
- Repeaters allowed

### MURS

- [Modulation: AM, FM, Phase Modulation](https://en.wikipedia.org/wiki/Multi-Use_Radio_Service#Authorized_modes)
- 60kHz spacing on channels 1-3
- 30kHz between channels 4 and 5

### Frequencies as of 2018
<table>
  <tr><th>Name</th><th>Channel #</th><th>Frequency (MHz)</th><th>Deviation</th></tr>
  <tr><th colspan="4">FRS/GMRS shared channels, Max Power: 2 W FRS / 5 W GMRS</th></tr>
  <tr><td>FRS 1 / GMRS 9</td> <td>1</td><td>462.5625 </td><td>N</td></tr>
  <tr><td>FRS 2 / GMRS 10</td><td>2</td><td>462.5875 </td><td>N</td></tr>
  <tr><td>FRS 3 / GMRS 11</td><td>3</td><td>462.6125 </td><td>N</td></tr>
  <tr><td>FRS 4 / GMRS 12</td><td>4</td><td>462.6375 </td><td>N</td></tr>
  <tr><td>FRS 5 / GMRS 13</td><td>5</td><td>462.6625 </td><td>N</td></tr>
  <tr><td>FRS 6 / GMRS 14</td><td>6</td><td>462.6875 </td><td>N</td></tr>
  <tr><td>FRS 7 / GMRS 15</td><td>7</td><td>462.7125 </td><td>N</td></tr>

  <tr><th colspan="4">FRS Channels, Max Power: 0.5 W</th></tr>
  <tr><td>FRS 8</td><td>8</td><td>467.5625 </td><td>N</td></tr>
  <tr><td>FRS 9</td><td>9</td><td>467.5875 </td><td>N</td></tr>
  <tr><td>FRS 10</td><td>10</td><td>467.6125 </td><td>N</td></tr>
  <tr><td>FRS 11</td><td>11</td><td>467.6375 </td><td>N</td></tr>
  <tr><td>FRS 12</td><td>12</td><td>467.6625 </td><td>N</td></tr>
  <tr><td>FRS 13</td><td>13</td><td>467.6875 </td><td>N</td></tr>
  <tr><td>FRS 14</td><td>14</td><td>467.7125 </td><td>N</td></tr>

  <tr><th colspan="4">Dedicated GMRS Channels</th></tr>
  <tr><td>GMRS 1</td><td>15</td><td>462.5500 </td><td>W/N</td></tr>
  <tr><td>GMRS 2</td><td>16</td><td>462.5750 </td><td>W/N</td></tr>
  <tr><td>GMRS 3</td><td>17</td><td>462.6000 </td><td>W/N</td></tr>
  <tr><td>GMRS 4</td><td>18</td><td>462.6250 </td><td>W/N</td></tr>
  <tr><td>GMRS 5</td><td>19</td><td>462.6500 </td><td>W/N</td></tr>
  <tr><td>GMRS 6</td><td>20</td><td>462.6750 </td><td>W/N</td></tr>
  <tr><td>GMRS 7</td><td>21</td><td>462.7000 </td><td>W/N</td></tr>
  <tr><td>GMRS 8</td><td>22</td><td>462.7250 </td><td>W/N</td></tr>

  <tr><th colspan="4">MURS Channels</th></tr>
  <tr><td>MURS 1</td><td>1</td><td>151.820</td><td>N</td></tr>
  <tr><td>MURS 2</td><td>2</td><td>151.880</td><td>N</td></tr>
  <tr><td>MURS 3</td><td>3</td><td>151.940</td><td>N</td></tr>
  <tr><td>MURS 4</td><td>4</td><td>154.570</td><td>W/N</td></tr>
  <tr><td>MURS 5</td><td>5</td><td>154.600</td><td>W/N</td></tr>
</table>

### Power considerations

FRS radios:
- are limited to 0.5W on channels 8-14.
- are limited to 2W on channels 15-22.
- [pre-2017 Radios *may* be limited to 0.5W on all channels](https://en.wikipedia.org/wiki/Family_Radio_Service#Technical_information).

GMRS radios (with FCC issued license)
- are limited to 5W on channels 1-7.
- are limited to 0.5W on channels 8-14.
- are limited to 50W on channels 15-22

### GMRS Repeaters

GMRS Repeaters listen at +5MHz and broadcast on regular channels. GMRS Channel 1 = 462.550, GMRS-R input = 467.550.
