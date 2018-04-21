# Specs

## A card with this stuff in it

// - Geocoder

- 2-control slider / range slider

- Switch to switch between uphill/downhill mode.

- Two sliders or one range slider indicate the min/max incline settings

## Popup on map click with this stuff in it

- Description

- Incline

- 'Record' button

- 'Cancel' button

## Map

- Mapbox Streets / AccessMap (sans footpaths) basemap

- Shows all sidewalks
  - Gray by default
  - Selected range is red
  - Selected color could be different between uphill/downhill

## Other

- Zoom in/out

## Logging

- Array of click actions with:
  - type
  - payload

- Actions:
  - Submits a result:
    Log the click action
    Log the info about the feature that was clicked
    Log the current slider settings
    Timestamp
    Log the button type:
      'impossible'
      'possible'
      'difficult'
      'not difficult'
