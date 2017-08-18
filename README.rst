#################################################
color-utils-js
#################################################

.. contents:: :depth: 2
.. section-numbering:: :depth: 2


=================================================
Color Formats
=================================================
The goal is to allow the color specifications allowed in CSS for ease of use.
However that is still some way of and now the formats supported are the following.

Functional notation
=================================================
+------------------+-----------------------------------------------------------+---------+
| Notation         | Description                                               | Weight  |
+===========+======+===========================================================+=========+
| rgb(R, G, B)     | Each value ``R(ed)``, ``G(reen)`` and ``B(lue)``          | 0       |
|                  | is an integer between 0 and 255.                          |         |
+------------------+-----------------------------------------------------------+---------+
| rgba(R, G, B, A) | Same as ``rgb()`` but with an additional ``Alpha`` value. | 1       |
|                  | The alpha value is a decimal number between 0 and 1.      |         |
+------------------+-----------------------------------------------------------+---------+

Hexadecimal notation
=================================================
+------------------+-----------------------------------------------------------+---------+
| Notation         | Description                                               | Weight  |
+==================+===========================================================+=========+
| #RRGGBB          | Where each pair of ``R(ed)``, ``G(reen)`` and ``B(lue)``  | 0       |
|                  | is an integer between 0 and 255 represented by            |         |
|                  | hexadecimal (base 16). Values are given as pairs          |         |
|                  | therefore single digit values need to be padded with      |         |
|                  | leading zero.                                             |         |
|                  |                                                           |         |
|                  | **Examples**, decimal values to the left and their        |         |
|                  | hexadecimal translation to the right: ``255 = FF``,       |         |
|                  | ``0 = 00`` and ``10 = 0A``.                               |         |
+------------------+-----------------------------------------------------------+---------+
| #RRGGBBAA        | Same as ``#RRGGBB`` but with an additional pair for       | 1       |
|                  | ``Alpha``. Alpha follows the same convention as           |         |
|                  | the other values.                                         |         |
+------------------+-----------------------------------------------------------+---------+
| #RGB             | Shorter version of ``#RRGGBB`` where each values is       | 0       |
|                  | expanded.                                                 |         |
|                  |                                                           |         |
|                  | **Example**: ``#B03`` is equal to ``#BB0033``.            |         |
+------------------+-----------------------------------------------------------+---------+
| #RGBA            | Shorter version of ``#RRGGBBAA`` where each values is     | 1       |
|                  | expanded.                                                 |         |
|                  |                                                           |         |
|                  | **Example**: ``#9F08`` is equal to ``#99FF0088``.         |         |
+------------------+-----------------------------------------------------------+---------+


=================================================
Methods
=================================================

Transition
=================================================
Generate a list of colors that transitions between two colors. Could also be described as a linear gradient.

Signature
-------------------------------------------------
::

    ColorUtils.transition(start, end, steps)



Parameters
-------------------------------------------------
+-----------+-------------+----------------------------------------------------+
| Name      | Type        | Description                                        |
+===========+=============+====================================================+
| start     | string      | First color in the transition.                     |
|           |             | Information about supported `Color Formats`_       |
+-----------+-------------+----------------------------------------------------+
| end       | string      | Second color in the transition.                    |
|           |             | Information about supported `Color Formats`_       |
+-----------+-------------+----------------------------------------------------+
| steps     | int         | The total number of colors generated for the       |
|           |             | transition, start and end colors included.         |
|           |             | The values has to be 2 or greater.                 |
+-----------+-------------+----------------------------------------------------+

Returns
-------------------------------------------------
+-------------+--------------------------------------------------------------------------------------------------------+
| Type        | Description                                                                                            |
+-------------+--------------------------------------------------------------------------------------------------------+
| array       | Collection of colors in string format creating a gradient from ``start`` to ``end`` color.             |
|             | The length of the collection will be equal to the number of ``steps`` specified.                       |
|             | Position 0 in the collection will be equal to the ``start`` color and position ``steps - 1``           |
|             | will be equal to the ``end`` color.                                                                    |
+-------------+--------------------------------------------------------------------------------------------------------+

Notes
-------------------------------------------------
The start and end colors may be entered using different color formats.
The returned collection will however only consist of one color format.
What format is chosen is based on the weight of the formats used.
The weight that is the heaviest will selected primarily.
If weights are equal the one that occurs will take precedence.
Information about each formats weight you can find under the section `Color Formats`_.



Example
-------------------------------------------------
Code
+++++++++++++++++++++++++++++++++++++++++++++++++
.. code:: javascript

    var red = "#bb3f3f";
    var green = "rgb(63, 187, 63)";
    var steps = 30;
    var transition = ColorUtils.transition(red, green, steps);


Result
+++++++++++++++++++++++++++++++++++++++++++++++++
::

    [ #bb3f3f, #b7433f, #b2483f, #ae4c3f, #aa503f,
      #a6543f, #a1593f, #9d5d3f, #99613f, #95653f,
      #906a3f, #8c6e3f, #88723f, #83773f, #7f7b3f,
      #7b7f3f, #77833f, #72883f, #6e8c3f, #6a903f,
      #65953f, #61993f, #5d9d3f, #59a13f, #54a63f,
      #50aa3f, #4cae3f, #48b23f, #43b73f, #3fbb3f ]

Textual presentation of the colors stored in the variable ``transition`` after execution.

.. image:: docs/color-utils-example-transition.png

Visual presentation of the colors stored in the variable ``transition`` after execution.
