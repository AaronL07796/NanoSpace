// A single peptide
function Peptide (angle) {
  this.angle = angle
}

Peptide.CAP = new Peptide (0)
Peptide.GHOST = new Peptide (0)
Peptide.STRAIGHT = new Peptide (0)
Peptide.CLOCKWISE = new Peptide (Math.HALF_PI)
Peptide.COUNTER_CLOCKWISE = new Peptide (-Math.HALF_PI)

Peptide.RADIUS = 16
Peptide.LEGEND_RADIUS = 8
Peptide.FULL_RADIUS = 22
Peptide.CHAIN_DISTANCE = Peptide.RADIUS * 2 + 8
Peptide.ICON_RADIUS = 8
Peptide.ARROW_RADIUS = 6
Peptide.LEGEND_ARROW = new Image()
Peptide.LEGEND_ARROW.src = 'images/legend_arrow.png'

Peptide.prototype.drawBlank = function (ctx, type, scale) {
  ctx.fillStyle = "white"

  ctx.beginPath ()
  ctx.arc (0, 0, scale * Peptide.RADIUS, 0, Math.TWO_PI, false)
  ctx.fill ()
}

Peptide.prototype.drawSymbolic = function (ctx) {
  this.drawBlank (ctx)

  ctx.strokeStyle = "black"
  ctx.lineWidth = 3
  ctx.lineCap = "round"

  if (this === Peptide.GHOST) {
    ctx.beginPath ()
    ctx.arc (0, 0, 4, 0, Math.TWO_PI, false)
    ctx.stroke ()
  }

  else if (this === Peptide.STRAIGHT) {
    ctx.beginPath ()
    ctx.moveTo (0, -Peptide.ICON_RADIUS)
    ctx.lineTo (0, Peptide.ICON_RADIUS)
    ctx.stroke ()
  }

  /* FIXME: we can do without the rotation here. */
  else if (this === Peptide.CLOCKWISE) {
    ctx.save ()
    ctx.rotate (Math.HALF_PI * -0.5)

    ctx.beginPath ()
    ctx.moveTo (0, -Peptide.ICON_RADIUS)
    ctx.lineTo (0, 0)
    ctx.lineTo (-Peptide.ICON_RADIUS, 0)
    ctx.stroke ()

    ctx.restore ()
  }

  /* FIXME: we can do without the rotation here. */
  else if (this === Peptide.COUNTER_CLOCKWISE) {
    ctx.save ()
    ctx.rotate (Math.HALF_PI * 0.5)

    ctx.beginPath ()
    ctx.moveTo (0, -Peptide.ICON_RADIUS)
    ctx.lineTo (0, 0)
    ctx.lineTo (Peptide.ICON_RADIUS, 0)
    ctx.stroke ()

    ctx.restore ()
  }
}

Peptide.prototype.drawLegend = function (ctx, type, scale) {
  if(type == 'first') {
    ctx.fillStyle = "#30A061"
    ctx.beginPath()
    ctx.arc(0, 0, scale * Peptide.LEGEND_RADIUS, 0, Math.TWO_PI, false)
    ctx.fill()
    
  } else if(type == 'last') {
    ctx.fillStyle = "#CB2532"
    ctx.beginPath()
    ctx.arc(0, 0, scale * Peptide.LEGEND_RADIUS, 0, Math.TWO_PI, false)
    ctx.fill()
    
  } else if(type == 'highlighted') {
    ctx.strokeStyle = "#00FFFF"
    ctx.beginPath()
    ctx.arc(0, 0, scale * Peptide.LEGEND_RADIUS, 0, Math.TWO_PI, false)
    ctx.drawImage(Peptide.LEGEND_ARROW, 6, -1 * (Peptide.LEGEND_ARROW.height + 6))
    ctx.stroke()
    
  } else if(type == 'filled') {
    ctx.fillStyle = "#E9AF49"
    ctx.strokeStyle = "#E9AF49"
    ctx.beginPath()
    ctx.arc(0, 0, scale * Peptide.LEGEND_RADIUS, 0, Math.TWO_PI, false)
    ctx.fill()
    ctx.stroke()
    
  } else {
    ctx.strokeStyle = "#E9AF49"
    ctx.beginPath()
    ctx.arc(0, 0, scale * Peptide.LEGEND_RADIUS, 0, Math.TWO_PI, false)
    ctx.stroke()
  }
  
  ctx.fillStyle = "#000000"
  ctx.beginPath()
  ctx.arc(0, 0, scale * 3, 0, Math.TWO_PI, false)
  ctx.fill()
}

Peptide.prototype.drawFull = function (ctx, type, scale) {
  if(type == 'first') {
    ctx.fillStyle = "#30A061"
    ctx.beginPath()
    ctx.arc(0, 0, scale * Peptide.FULL_RADIUS, 0, Math.TWO_PI, false)
    ctx.fill()
    
  } else if(type == 'last') {
    ctx.fillStyle = "#CB2532"
    ctx.beginPath()
    ctx.arc(0, 0, scale * Peptide.FULL_RADIUS, 0, Math.TWO_PI, false)
    ctx.fill()
    
  } else {
    
    if(this === Peptide.GHOST || type == 'highlighted') {
      ctx.fillStyle = '#FFFFFF'
    } else if(this === Peptide.COUNTER_CLOCKWISE) {
      ctx.fillStyle = '#5294CE'
    } else if(this === Peptide.STRAIGHT) {
      ctx.fillStyle = '#F5821F'
    } else if(this === Peptide.CLOCKWISE) {
      ctx.fillStyle = '#773D98'
    }
    
    if(type == 'highlighted') {
      ctx.strokeStyle = "#00FFFF"
    } else {
      ctx.strokeStyle = "#E9AF49"
    }
    
    ctx.beginPath()
    ctx.arc(0, 0, scale * Peptide.FULL_RADIUS, 0, Math.TWO_PI, false)
    ctx.stroke()
    ctx.fill()
  }
}

Peptide.prototype.drawComparison = function (ctx, b, type) {
  if(type == 'first') {
    ctx.fillStyle = "#30A061"
    ctx.beginPath()
    ctx.arc(0, 0, Peptide.RADIUS, 0, Math.TWO_PI, false)
    ctx.fill()
    
  } else if(type == 'last') {
    ctx.fillStyle = "#CB2532"
    ctx.beginPath()
    ctx.arc(0, 0, Peptide.RADIUS, 0, Math.TWO_PI, false)
    ctx.fill()
    
  } else {
    
    if(this === Peptide.COUNTER_CLOCKWISE) {
      ctx.fillStyle = '#5294CE'
    } else if(this === Peptide.STRAIGHT) {
      ctx.fillStyle = '#F5821F'
    } else if(this === Peptide.CLOCKWISE) {
      ctx.fillStyle = '#773D98'
    } else {
      ctx.fillStyle = '#FFFFFF'
    }
    
    ctx.lineWidth = 2
    ctx.strokeStyle = "#E9AF49"
    
    ctx.beginPath()
    ctx.arc(0, 0, Peptide.RADIUS, 0, Math.TWO_PI, false)
    ctx.stroke()
    ctx.fill()
  }

  if(!b) {
    ctx.lineWidth = 3
    ctx.lineCap = "round"
    ctx.strokeStyle = "#CB2532"
    
    ctx.beginPath ()
    ctx.moveTo (-Peptide.ICON_RADIUS, -Peptide.ICON_RADIUS)
    ctx.lineTo (Peptide.ICON_RADIUS, Peptide.ICON_RADIUS)
    ctx.moveTo (Peptide.ICON_RADIUS, -Peptide.ICON_RADIUS)
    ctx.lineTo (-Peptide.ICON_RADIUS, Peptide.ICON_RADIUS)
    ctx.stroke ()
  }
}





// A chain of peptides
function Polypeptide (n, random) {
  var n1 = n - 1,
      i, peptide

  this.peptides = new Array (n)
  
  if(n > 11) {
    this.scale = 0.62
  } else if(n > 8) {
    this.scale = 0.8
  } else {
    this.scale = 1.0
  }

  if (n > 0) {
    this.peptides[0] = Peptide.CAP

    if (n > 1) {
      this.peptides[n1] = Peptide.CAP

      if (random) {
        do {
          for (i = 1; i < n1; ++i) {
            peptide = []

            /* Don't allow two straights in a row. */
            if (i < 2 || this.peptides[i - 1] !== Peptide.STRAIGHT)
              peptide.push (Peptide.STRAIGHT)

            /* Don't allow three clockwise in a row. */
            if (i < 3 ||
                this.peptides[i - 1] !== Peptide.CLOCKWISE ||
                this.peptides[i - 2] !== Peptide.CLOCKWISE)
              peptide.push (Peptide.CLOCKWISE)

            /* Don't allow three counter-clockwise in a row. */
            if (i < 3 ||
                this.peptides[i - 1] !== Peptide.COUNTER_CLOCKWISE ||
                this.peptides[i - 2] !== Peptide.COUNTER_CLOCKWISE)
              peptide.push (Peptide.COUNTER_CLOCKWISE)

            this.peptides[i] = peptide.random ()
          }
        } while (this.overlap ())
      }

      else {
        for (i = 1; i < n1; ++i)
          this.peptides[i] = Peptide.GHOST
      }
    }
  }
}


Polypeptide.prototype.length = function (func) {
  var length_multiple = 1
  if(func == "drawFull") length_multiple = 1.2
  return this.scale * (this.peptides.length - 1) * length_multiple * Peptide.CHAIN_DISTANCE + 2*Peptide.FULL_RADIUS
}

/* Returns the <X,Y> coordinates of each peptide, if they're fully folded and
 * aligned to a grid. */
Polypeptide.prototype.align = function () {
  var x = [0],
      y = [0],
      a = 1,
      i, peptide

  for (i = 1; i < this.peptides.length; ++i) {
    /* Advance and increase bounds. */
    switch (a) {
      case 0:
        x.push (x[x.length - 1] + 1)
        y.push (y[y.length - 1])
        break

      case 1:
        x.push (x[x.length - 1])
        y.push (y[y.length - 1] + 1)
        break

      case 2:
        x.push (x[x.length - 1] - 1)
        y.push (y[y.length - 1])
        break

      case 3:
        x.push (x[x.length - 1])
        y.push (y[y.length - 1] - 1)
        break
    }

    /* Rotate if needed. */
    peptide = this.peptides[i]

    if (peptide === Peptide.CLOCKWISE) {
      if (++a === 4)
        a = 0
    }

    else if (peptide === Peptide.COUNTER_CLOCKWISE) {
      if (--a === -1)
        a = 3
    }
  }

  return {x: x, y: y}
}

/* What are the bounds of this polypeptide (if it were fully folded and aligned
 * to a grid)? */
Polypeptide.prototype.bounds = function () {
  var align = this.align (),
      minX = Math.min.apply (null, align.x),
      maxX = Math.max.apply (null, align.x),
      minY = Math.min.apply (null, align.y),
      maxY = Math.max.apply (null, align.y)

  return new Rectangle (minX, minY, maxX + 1 - minX, maxY + 1 - minY)
}

/* Does this polypeptide ever overlap onto itself (if it were fully folded and
 * aligned to a grid)? */
Polypeptide.prototype.overlap = function () {
  var align = this.align (),
      x = align.x,
      y = align.y,
      length = x.length,
      i, j

  for (i = 1; i < length; ++i)
    for (j = 0; j < i; ++j)
      if (x[i] === x[j] && y[i] === y[j])
        return true

  return false
}

Polypeptide.prototype.compare = function (pp) {
  var length = this.peptides.length,
      forwards = new Array (length),
      backwards = new Array (length),
      fcount = 0,
      bcount = 0,
      i, a, b

  /* Make sure we're comparing apples to apples. */
  if (length !== pp.peptides.length)
    return null

  /* Check forwards. */
  for (i = 0; i < length; ++i) {
    a = this.peptides[i]
    b = pp.peptides[i]

    if (forwards[i] = (a === b))
      ++fcount
  }

  /* Check backwards. */
  for (i = 0; i < length; ++i) {
    a = this.peptides[i]
    b = pp.peptides[length - (i + 1)]

    /* Reverse direction (since we're checking backwards). */
    if (b === Peptide.CLOCKWISE)
      b = Peptide.COUNTER_CLOCKWISE

    else if (b === Peptide.COUNTER_CLOCKWISE)
      b = Peptide.CLOCKWISE

    if (backwards[i] = (a === b))
      ++bcount
  }

  /* Return the results of whichever match is better. */
  return (fcount >= bcount) ?
    {match: fcount === length, matches: forwards} :
    {match: bcount === length, matches: backwards}
}

Polypeptide.prototype.draw = function (ctx, func, fold, highlighted_i) {
  var bounds = this.bounds (),
      length = this.length (),
      i

  ctx.save ()
  
  if (func === "drawLegend") {
    ctx.strokeStyle = "#666666"
    ctx.lineWidth = 2
    var length_multiple = 1
    
  } else if(func == "drawFull") {
    ctx.strokeStyle = "#000000"
    ctx.lineWidth = 3 * this.scale
    ctx.rotate(Math.PI/-2)
    var length_multiple = 1.225
  }
  
  var chain_distance = Peptide.CHAIN_DISTANCE * this.scale
  
  bounds.x -= 0.5
  bounds.y -= 0.5
  bounds.x *= length_multiple * chain_distance
  bounds.y *= length_multiple * chain_distance
  bounds.w *= length_multiple * chain_distance
  bounds.h *= length_multiple * chain_distance
  
  ctx.translate (
    fold * (bounds.w * -0.5 - bounds.x),
    fold * (bounds.h * -0.5 - bounds.y) + (1 - fold) * length * -0.5
  )
  

  for (i = 0; i < this.peptides.length - 1; ++i) {
    ctx.save ()
    ctx.rotate (this.peptides[i].angle * fold)

    ctx.beginPath ()
    ctx.moveTo (0, 0)
    ctx.lineTo (0, length_multiple * chain_distance)
    ctx.stroke ()
    
    ctx.translate (0, length_multiple * chain_distance)
  }

  for (i = this.peptides.length - 1; i >= 1; --i) {
    if(i == this.peptides.length - 1) {
      this.peptides[i][func](ctx, 'last', this.scale)
    } else if(i == highlighted_i) {
      this.peptides[i][func](ctx, 'highlighted', this.scale)
    } else if(func === "drawLegend" && i < highlighted_i) {
      this.peptides[i][func](ctx, 'filled', this.scale)
    } else {
      this.peptides[i][func](ctx, null, this.scale)
    }
    
    ctx.restore ()
  }

  this.peptides[0][func](ctx, 'first', this.scale)

  ctx.restore ()
}

Polypeptide.prototype.drawLegend = function (ctx, highlighted_i) {
  this.draw (ctx, "drawLegend", 1, highlighted_i)
}

Polypeptide.prototype.drawFull = function (ctx, highlighted_i) {
  this.draw (ctx, "drawFull", 0, highlighted_i)
}

Polypeptide.prototype.drawBlank = function (ctx, fold) {
  this.draw (ctx, "drawBlank", fold)
}

Polypeptide.prototype.drawSymbolic = function (ctx, fold) {
  this.draw (ctx, "drawSymbolic", fold)
}

Polypeptide.prototype.drawComparison = function (ctx, fold, matches) {
  var bounds = this.bounds (),
      length = this.length (),
      i
  
  bounds.x -= 0.5
  bounds.y -= 0.5
  bounds.x *= Peptide.CHAIN_DISTANCE
  bounds.y *= Peptide.CHAIN_DISTANCE
  bounds.w *= Peptide.CHAIN_DISTANCE
  bounds.h *= Peptide.CHAIN_DISTANCE

  ctx.save ()
  ctx.translate (
    fold * (bounds.w * -0.5 - bounds.x),
    fold * (bounds.h * -0.5 - bounds.y) + (1 - fold) * length * -0.5
  )

  ctx.strokeStyle = "#000"
  ctx.lineWidth = 3

  for (i = 0; i < this.peptides.length - 1; ++i) {
    ctx.save ()
    ctx.rotate (this.peptides[i].angle * fold)

    ctx.beginPath ()
    ctx.moveTo (0, 0)
    ctx.lineTo (0, Peptide.CHAIN_DISTANCE)
    ctx.stroke ()
    
    ctx.translate (0, Peptide.CHAIN_DISTANCE)
  }

  i = this.peptides.length - 1
  this.peptides[i].drawComparison (ctx, true, 'last')
  ctx.restore ()
  --i  
  
  for (; i >= 1; --i) {
    this.peptides[i].drawComparison(ctx, matches[i])
    ctx.restore ()
  }

  this.peptides[0].drawComparison (ctx, true, 'first')

  ctx.restore ()
}
