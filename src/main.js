import './style/main.styl'

const test = () => {
    console.log('tested')
}

test()

const wm = new WeakMap()
let x = {}

wm.set(x, 37)
