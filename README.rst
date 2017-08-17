#################################################
color-utils-js
#################################################

.. contents:: Table of Contents


=================================================
Color Formats
=================================================
The goal is to allow the color specifications allowed in CSS for ease of use.
However that is still some way of and now the formats supported are the following.

Functional notation
=================================================
+------------------+-----------------------------------------------------------+
| Notation         | Description                                               |
+===========+======+===========================================================+
| rgb(R, G, B)     | Each value ``R(ed)``, ``G(reen)`` and ``B(lue)``          |
|                  | is an integer between 0 and 255.                          |
+------------------+-----------------------------------------------------------+
| rgba(R, G, B, A) | Same as ``rgb()`` but with an additional ``Alpha`` value. |
|                  | The alpha value is a decimal number between 0 and 1.      |
+------------------+-----------------------------------------------------------+

Hexadecimal notation
=================================================
+------------------+-----------------------------------------------------------+
| Notation         | Description                                               |
+===========+======+===========================================================+
| #RRGGBB          | Where each pair of ``R(ed)``, ``G(reen)`` and ``B(lue)``  |
|                  | is an integer between 0 and 255 represented by            |
|                  | hexadecimal (base 16). Values are given as pairs          |
|                  | therefore single digit values need to be padded with      |
|                  | leading zero.                                             |
|                  |                                                           |
|                  | **Examples**, decimal values to the left and their        |
|                  | hexadecimal translation to the right: ``255 = FF``,       |
|                  | ``0 = 00`` and ``10 = 0A``.                               |
+------------------+-----------------------------------------------------------+
| #RRGGBBAA        | Same as ``#RRGGBB`` but with an additional pair for       |
|                  | ``Alpha``. Alpha follows the same convention as           |
|                  | the other values.                                         |
+------------------+-----------------------------------------------------------+
| #RGB             | Shorter version of ``#RRGGBB`` where each values is       |
|                  | expanded.                                                 |
|                  |                                                           |
|                  | **Example**: ``#B03`` is equal to ``#BB0033``.            |
+------------------+-----------------------------------------------------------+
| #RGBA            | Shorter version of ``#RRGGBBAA`` where each values is     |
|                  | expanded.                                                 |
|                  |                                                           |
|                  | **Example**: ``#9F08`` is equal to ``#99FF0088``.         |
+------------------+-----------------------------------------------------------+
