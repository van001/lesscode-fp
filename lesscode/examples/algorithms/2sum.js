
const {_, DirStream, Print} = require('lesscode-fp')
const fs = require('fs').promises




_(DirStream()(process.cwd()))()(Print) 