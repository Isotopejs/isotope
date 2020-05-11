# Utils

Prototope provides you with a LOT of utility functions. However, fear not as their names are easy to remember, [inspired by Tailwind's](./why.md) battle-tested naming scheme and autocompletion-friendly in [TypeScript](./typescript.md)-enabled code editors and IDEs.

If you need even more utils, you can always [create your own](./customization.md).

## Shortcuts

Utils names are easy to remember, because of the use of straight-forward shortcuts. Here are some examples:

- `w()` -> sets width
- `m()` -> sets margin
- `roundeTSm` -> sets border-radius of top border to small value.

## Imports

Utils are grouped by respective categories within more general folders. This gives you option to import only the utils required, even if your environment doesn't support tree-shaking.

```typescript
import { bgColor } from "@isotope/prototope";
// or more specifically
import { bgColor } from "@isotope/prototope/lib/utils";
// or even more specifically
import { bgColor } from "@isotope/prototope/lib/utils/background";
// or right to the point
import { bgColor } from "@isotope/prototope/lib/utils/background/background-color";
```

## Transform utils

All of Prototope's transform utils (i.e. rotate, translate, etc.) are treated specially to allow for easy combinations. Thus, you can use them together just like that.

---

Here's a complete list of all of Prototope's built-in utils. For more details about their implementation, check out [the repo](https://github.com/Isotope-js/isotope/tree/master/packages/prototope).

## Accessibility

### Screen readers

- `srOnly`
- `notSrOnly`

## Background

### Background attachment

- `bgFixed`
- `bgLocal`
- `bgScroll`

### Background color

- `bgColor(value: "primary" | "secondary" | "dark" | "darker" | "light" | "lighter")`

### Background image

- `bgGradient`
- `bgUrl(url: string)`

### Background position

- `bgBottom`
- `bgCenter`
- `bgLeft`
- `bgLeftBottom`
- `bgLeftTop`
- `bgRight`
- `bgRightBottom`
- `bgRightTop`
- `bgTop`

### Background repeat

- `bgRepeat`
- `bgNoRepeat`
- `bgRepeatX`
- `bgRepeatY`
- `bgRepeatRound`
- `bgRepeatSpace`

### Background size

- `bgAuto`
- `bgCover`
- `bgContain`

## Borders

### Border color

- `borderColor(value: "primary" | "secondary" | "dark" | "darker" | "light" | "lighter")`

### Border radius

- `roundeNone`
- `roundeSm`
- `rounde`
- `roundeMd`
- `roundeLg`
- `roundeXl`
- `rounde2Xl`
- `roundeFull`
- `roundeTNone`
- `roundeRNone`
- `roundeBNone`
- `roundeLNone`
- `roundeTSm`
- `roundeRSm`
- `roundeBSm`
- `roundeLSm`
- `roundeT`
- `roundeR`
- `roundeB`
- `roundeL`
- `roundeTMd`
- `roundeRMd`
- `roundeBMd`
- `roundeLMd`
- `roundeTLg`
- `roundeRLg`
- `roundeBLg`
- `roundeLLg`
- `roundeTXl`
- `roundeRXl`
- `roundeBXl`
- `roundeLXl`
- `roundeT2Xl`
- `roundeR2Xl`
- `roundeB2Xl`
- `roundeL2Xl`
- `roundeTFull`
- `roundeRFull`
- `roundeBFull`
- `roundeLFull`
- `roundeTlNone`
- `roundeTrNone`
- `roundeBrNone`
- `roundeBlNone`
- `roundeTlSm`
- `roundeTrSm`
- `roundeBrSm`
- `roundeBlSm`
- `roundeTl`
- `roundeTr`
- `roundeBr`
- `roundeBl`
- `roundeTlMd`
- `roundeTrMd`
- `roundeBrMd`
- `roundeBlMd`
- `roundeTlLg`
- `roundeTrLg`
- `roundeBrLg`
- `roundeBlLg`
- `roundeTlXl`
- `roundeTrXl`
- `roundeBrXl`
- `roundeBlXl`
- `roundeTl2Xl`
- `roundeTr2Xl`
- `roundeBr2Xl`
- `roundeBl2Xl`
- `roundeTlFull`
- `roundeTrFull`
- `roundeBrFull`
- `roundeBlFull`

### Border style

- `borderSolid`
- `borderDashed`
- `borderDotted`
- `borderDouble`
- `borderNone`

### Border width

- `border(value?: 0 | 2 | 4 | 8)`
- `borderT(value?: 0 | 2 | 4 | 8)`
- `borderB(value?: 0 | 2 | 4 | 8)`
- `borderR(value?: 0 | 2 | 4 | 8)`
- `borderL(value?: 0 | 2 | 4 | 8)`

## Effects

### Box shadow

- `shadowXs`
- `shadowSm`
- `shadow`
- `shadowMd`
- `shadowLg`
- `shadowXl`
- `shadow2Xl`
- `shadowInner`
- `shadowOutline`
- `shadowNone`

### Opacity

- `opacity(value: 0 | 25 | 50 | 75 |100)`

## Flexbox

### Align content

- `contentStart`
- `contentCenter`
- `contentEnd`
- `contentBetween`
- `contentAround`

### Align items

- `itemsStretch`
- `itemsStart`
- `itemsCenter`
- `itemsEnd`
- `itemsBaseline`

### Align self

- `selfAuto`
- `selfStart`
- `selfCenter`
- `selfEnd`
- `selfStretch`

### Direction

- `flexRow`
- `flexRowReverse`
- `flexCol`
- `flexColReverse`

### Flex grow

- `flexGrow(value: 0 | 1 = 0)`

### Flex shrink

- `flexShrink(value: 0 | 1 = 0)`

### Flex

- `flexInitial`
- `flex1`
- `flexAuto`
- `flexNone`

### Justify content

- `justifyStart`
- `justifyCenter`
- `justifyEnd`
- `justifyBetween`
- `justifyAround`

### Order

- `order(value: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | "first" | "last" | "none")`

### Wrap

- `flexNoWrap`
- `flexWrap`
- `flexWrapReverse`

## Grid

### Gap

- `gap(value: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16 | 20 | 24 | 32 | 40 | 48 | 56 | 64 | "px")`
- `rowGap(value: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16 | 20 | 24 | 32 | 40 | 48 | 56 | 64 | "px")`
- `colGap(value: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16 | 20 | 24 | 32 | 40 | 48 | 56 | 64 | "px")`

### Grid auto flow

- `gridFlowRow`
- `gridFlowCol`
- `gridFlowRowDense`
- `gridFlowColDense`

### Grid column

- `colAuto`
- `colSpan(value: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12)`
- `colStart(value: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | "auto")`
- `colEnd(value: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | "auto")`

### Grid row

- `rowAuto`
- `rowSpan(value: 1 | 2 | 3 | 4 | 5 | 6)`
- `rowStart(value: 1 | 2 | 3 | 4 | 5 | 6 | 7 | "auto")`
- `rowEnd(value: 1 | 2 | 3 | 4 | 5 | 6 | 7 | "auto")`

### Grid template column

- `gridCols(value: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | "none")`

### Grid template rows

- `gridRows(value: 1 | 2 | 3 | 4 | 5 | 6 | "none")`

## Interactivity

### Appearance

- `appearanceNone`

### Cursor

- `cursorAuto`
- `cursorDefault`
- `cursorPointer`
- `cursorWait`
- `cursorText`
- `cursorMove`
- `cursorNotAllowed`

### Outline

- `outlineNone`

### Pointer events

- `pointerEventsNone`
- `pointerEventsAuto`

### Resize

- `resizeNone`
- `resize`
- `resizeY`
- `resizeX`

### User select

- `selectNone`
- `selectText`
- `selectAll`
- `selectAuto`

## Layout

### Box sizing

- `boxBorder`
- `boxContent`

### Clear

- `clearLeft`
- `clearRight`
- `clearBoth`
- `clearNone`

### Container

- `container`

### Display

- `hidden`
- `block`
- `inlineBlock`
- `inline`
- `flex`
- `inlineFlex`
- `grid`
- `table`
- `tableCaption`
- `tableCell`
- `tableColumn`
- `tableColumnGroup`
- `tableFooterGroup`
- `tableHeaderGroup`
- `tableRowGroup`
- `tableRow`

### Float

- `floatRight`
- `floatLeft`
- `floatNone`
- `clearfix`

### Object fit

- `objectContain`
- `objectCover`
- `objectFill`
- `objectNone`
- `objectScaleDown`

### Object position

- `objectBottom`
- `objectCenter`
- `objectLeft`
- `objectLeftBottom`
- `objectLeftTop`
- `objectRight`
- `objectRightBottom`
- `objectRightTop`
- `objectTop`

### Overflow

- `overflowAuto`
- `overflowHidden`
- `overflowVisible`
- `overflowScroll`
- `overflowXAuto`
- `overflowYAuto`
- `overflowXHidden`
- `overflowYHidden`
- `overflowXVisible`
- `overflowYVisible`
- `overflowXScroll`
- `overflowYScroll`
- `scrollingTouch`
- `scrollingAuto`

### Placement

- `inset(value: 0 | "auto" = "auto")`
- `insetY(value: 0 | "auto" = "auto")`
- `insetX(value: 0 | "auto" = "auto")`
- `bottom(value: 0 | "auto" = "auto")`
- `top(value: 0 | "auto" = "auto")`
- `left(value: 0 | "auto" = "auto")`
- `right(value: 0 | "auto" = "auto")`

### Position

- `$static`
- `fixed`
- `absolute`
- `relative`
- `sticky`

### Visibility

- `visible`
- `invisible`

### Z index

- `z(value: 0 | 10 | 20 | 30 | 40 | 50 | "auto")`

## Sizing

### Height

- `h(value: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16 | 20 | 24 | 32 | 40 | 48 | 56 | 64 | "px" | "auto" | "full" | "screen")`

### Max height

- `maxHFull`
- `maxHScreen`

### Max width

- `maxWXs`
- `maxWSm`
- `maxWMd`
- `maxWLg`
- `maxWXl`
- `maxW2Xl`
- `maxW3Xl`
- `maxW4Xl`
- `maxW5Xl`
- `maxW6Xl`
- `maxWFull`
- `maxWScreenSm`
- `maxWScreenMd`
- `maxWScreenLg`
- `maxWScreenXl`
- `maxWNone`

### Min height

- `minH0`
- `minHFull`
- `minHScreen`

### Min width

- `minW0`
- `minWFull`

### Width

- `w(value: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16 | 20 | 24 | 32 | 40 | 48 | 56 | 64 | "1/2" | "1/3" | "2/3" | "1/4" | "2/4" | "3/4" | "1/5" | "2/5" | "3/5" | "4/5" | "1/6" | "2/6" | "3/6" | "4/6" | "5/6" | "1/12" | "2/12" | "3/12" | "4/12" | "5/12" | "6/12" | "7/12" | "8/12" | "9/12" | "10/12" | "11/12" | "px" | "auto" | "full" | "screen")`

## Spacing

### Margin

- `m(value: 0 | 1 | -1 | 2 | -2 | 3 | -3 | 4 | -4 | 5 | -5 | 6 | -6 | 8 | -8 | 10 | -10 | 12 | -12 | 16 | -16 | 20 | -20 | 24 | -24 | 32 | -32 | 40 | -40 | 48 | -48 | 56 | -56 | 64 | -64 | "px" | "-px")`

### Padding

- `p(value: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16 | 20 | 24 | 32 | 40 | 48 | 56 | 64 | "px")`

## SVG

### Fill

- `fillCurrent`

### Stroke width

- `stroke(value: 0 | 1 | 2)`

### Stroke

- `strokeCurrent`

## Tables

### Border collapse

- `borderCollapse`
- `borderSeparate`

### Table layout

- `tableAuto`
- `tableFixed`

## Transforms

### Rotate

- `rotate(value: 0 | 45 | -45 | 90 | -90 | 180 | -180)`

### Scale

- `scale(value: 0 | 50 | 75 | 90 | 95 | 100 | 105 | 110 | 125 | 150)`
- `scaleX(value: 0 | 50 | 75 | 90 | 95 | 100 | 105 | 110 | 125 | 150)`
- `scaleY(value: 0 | 50 | 75 | 90 | 95 | 100 | 105 | 110 | 125 | 150)`

### Skew

- `skewX(value: 0 | 3 | -3 | 6 | -6 | 12 | -12)`
- `skewY(value: 0 | 3 | -3 | 6 | -6 | 12 | -12)`

### Transform origin

- `originCenter`
- `originTop`
- `originTopRight`
- `originRight`
- `originBottomRight`
- `originBottom`
- `originBottomLeft`
- `originLeft`
- `originTopLeft`

### Translate

- `translateX(value: 0 | 1 | -1 | 2 | -2 | 3 | -3 | 4 | -4 | 5 | -5 | 6 | -6 | 8 | -8 | 10 | -10 | 12 | -12 | 16 | -16 | 20 | -20 | 24 | -24 | 32 | -32 | 40 | -40 | 48 | -48 | 56 | -56 | 64 | -64 | "1/2" | "-1/2" | "px" | "-px" | "full" | "-full")`
- `translateY(value: 0 | 1 | -1 | 2 | -2 | 3 | -3 | 4 | -4 | 5 | -5 | 6 | -6 | 8 | -8 | 10 | -10 | 12 | -12 | 16 | -16 | 20 | -20 | 24 | -24 | 32 | -32 | 40 | -40 | 48 | -48 | 56 | -56 | 64 | -64 | "1/2" | "-1/2" | "px" | "-px" | "full" | "-full")`

## Transitions

### Transition duration

- `duration(value: 1000 | 700 | 500 | 300 | 200 | 150 | 100 | 75)`

### Transition property

- `transitionNone`
- `transitionAll`
- `transition`
- `transitionColors`
- `transitionOpacity`
- `transitionShadow`
- `transitionTransform`

### Transition timing function

- `easeLinear`
- `easeIn`
- `easeOut`
- `easeInOut`

## Typography

### Font size

- `textXs`
- `textSm`
- `textBase`
- `textLg`
- `textXl`
- `text2Xl`
- `text3Xl`
- `text4Xl`
- `text5Xl`
- `text6Xl`

### Font smoothing

- `antialiased`
- `subpixelAntialiased`

### Font style

- `italic`
- `notItalic`

### Font weight

- `fontHairline`
- `fontThin`
- `fontLight`
- `fontNormal`
- `fontMedium`
- `fontSemibold`
- `fontBold`
- `fontExtrabold`
- `fontBlack`

### Letter spacing

- `trackingTighter`
- `trackingTight`
- `trackingNormal`
- `trackingWide`
- `trackingWider`
- `trackingWidest`

### Line height

- `leading(value: 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | "none" | "tight" | "snug" | "normal" | "relaxed" | "loose")`

### List style position

- `listInside`
- `listOutside`

### List style type

- `listNone`
- `listDisc`
- `listDecimal`

### Placeholder color

- `placeholderColor(value: "primary" | "secondary" | "dark" | "darker" | "light" | "lighter")`

### Text align

- `textLeft`
- `textCenter`
- `textRight`
- `textJustify`

### Text color

- `textColor(value: "primary" | "secondary" | "dark" | "darker" | "light" | "lighter")`

### Text decoration

- `underline`
- `lineThrough`
- `noUnderline`

### Text transform

- `uppercase`
- `lowercase`
- `capitalize`
- `normalCase`

### Vertical align

- `alignBaseline`
- `alignTop`
- `alignMiddle`
- `alignBottom`
- `alignTextTop`
- `alignTextBottom`

### Whitespace

- `whitespaceNormal`
- `whitespaceNoWrap`
- `whitespacePre`
- `whitespacePreLine`
- `whitespacePreWrap`

### Word break

- `breakNormal`
- `breakWords`
- `breakAll`
- `truncate`
