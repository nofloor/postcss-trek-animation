const easing = {
  'linear': 'linear',
  'ease': 'ease',
  'ease-in': 'ease-in',
  'ease-out': 'ease-out',
  'ease-in-out': 'ease-in-out',
  'quad-ease-in': 'cubic-bezier(0.550,0.085,0.680,0.530)',
  'cubic-ease-in': 'cubic-bezier(0.550,0.055,0.675,0.190)',
  'quart-ease-in': 'cubic-bezier(0.895,0.030,0.685,0.220)',
  'quint-ease-in': 'cubic-bezier(0.755,0.050,0.855,0.060)',
  'sine-ease-in': 'cubic-bezier(0.470,0.000,0.745,0.715)',
  'expo-ease-in': 'cubic-bezier(0.950,0.050,0.795,0.035)',
  'circ-ease-in': 'cubic-bezier(0.600,0.040,0.980,0.335)',
  'back-ease-in': 'cubic-bezier(0.600,-0.280,0.735,0.045)',
  'quad-ease-out': 'cubic-bezier(0.250,0.460,0.450,0.940)',
  'cubic-ease-out': 'cubic-bezier(0.215,0.610,0.355,1.000)',
  'quart-ease-out': 'cubic-bezier(0.165,0.840,0.440,1.000)',
  'quint-ease-out': 'cubic-bezier(0.230,1.000,0.320,1.000)',
  'sine-ease-out': 'cubic-bezier(0.390,0.575,0.565,1.000)',
  'expo-ease-out': 'cubic-bezier(0.190,1.000,0.220,1.000)',
  'circ-ease-out': 'cubic-bezier(0.075,0.820,0.165,1.000)',
  'back-ease-out': 'cubic-bezier(0.175,0.885,0.320,1.275)',
  'quad-ease-in-out': 'cubic-bezier(0.455,0.030,0.515,0.955)',
  'cubic-ease-in-out': 'cubic-bezier(0.645,0.045,0.355,1.000)',
  'quart-ease-in-out': 'cubic-bezier(0.770,0.000,0.175,1.000)',
  'quint-ease-in-out': 'cubic-bezier(0.860,0.000,0.070,1.000)',
  'sine-ease-in-out': 'cubic-bezier(0.445,0.050,0.550,0.950)',
  'expo-ease-in-out': 'cubic-bezier(1.000,0.000,0.000,1.000)',
  'circ-ease-in-out': 'cubic-bezier(0.785,0.135,0.150,0.860)',
  'back-ease-in-out': 'cubic-bezier(0.680,-0.550,0.265,1.550)'
}

const defaults = {
  'transition-duration': '500ms',
  'transition-function': 'cubic-ease-in-out'
}

function trekAnimation(options = defaults) {
  return {
    postcssPlugin: 'postcss-trek-animaton',
    Declaration(decl) {
      if (decl.prop === '-trek-transition') {
        const values = decl.value.split(/\s\s?/g);
        const properties = [];
        while (/\d+(s|ms)/.test(values[0]) === false) {
          properties.push(values.shift());
        }
        decl
          .before(`transition-property: ${properties.join(', ')}`)
          .before(`transition-duration: ${undefined !== values[0] ? values[0] : options['transition-duration']}`)
          .before(`transition-timing-function: ${undefined !== values[1] ? easing[values[1]] : easing[options['transition-function']]}`);
        if (undefined !== values[2]) decl.before(`transition-property: ${values[2]}`);
        decl.remove();
      }
    }
  }
}

trekAnimation.postcss = true;

export default trekAnimation;