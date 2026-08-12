(module
 (type $0 (func (param i32) (result i32)))
 (type $1 (func (result i32)))
 (type $2 (func (param i32 i32) (result i32)))
 (type $3 (func (param i32 i32)))
 (type $4 (func (param i32 i32 i32)))
 (type $5 (func))
 (type $6 (func (param i32)))
 (type $7 (func (param i32 i32 i32 i32)))
 (type $8 (func (param i32 i32 i32) (result i32)))
 (type $9 (func (param i32 i32 i64)))
 (type $10 (func (param i32 i32 f64)))
 (type $11 (func (result f64)))
 (type $12 (func (param i32 i32 i32) (result f64)))
 (type $13 (func (param i32) (result f64)))
 (type $14 (func (param i32 i32) (result f64)))
 (type $15 (func (param i32 i32 i32 i32 f64) (result i32)))
 (type $16 (func (param i32 f64 i32) (result i32)))
 (import "env" "abort" (func $~lib/builtins/abort (param i32 i32 i32 i32)))
 (import "env" "js_on_progress" (func $src/views/idaStar/boardAstar/wasm/assembly/solver/js_on_progress (param i32 i32)))
 (global $src/views/idaStar/boardAstar/wasm/assembly/solver/width (mut i32) (i32.const 0))
 (global $src/views/idaStar/boardAstar/wasm/assembly/solver/height (mut i32) (i32.const 0))
 (global $src/views/idaStar/boardAstar/wasm/assembly/solver/n (mut i32) (i32.const 0))
 (global $src/views/idaStar/boardAstar/wasm/assembly/solver/emptyNum (mut i32) (i32.const 0))
 (global $src/views/idaStar/boardAstar/wasm/assembly/solver/winW (mut i32) (i32.const 3))
 (global $src/views/idaStar/boardAstar/wasm/assembly/solver/winH (mut i32) (i32.const 1))
 (global $src/views/idaStar/boardAstar/wasm/assembly/solver/winWeight (mut f64) (f64.const 4))
 (global $~lib/rt/itcms/total (mut i32) (i32.const 0))
 (global $~lib/rt/itcms/threshold (mut i32) (i32.const 0))
 (global $~lib/rt/itcms/state (mut i32) (i32.const 0))
 (global $~lib/rt/itcms/visitCount (mut i32) (i32.const 0))
 (global $~lib/rt/itcms/pinSpace (mut i32) (i32.const 0))
 (global $~lib/rt/itcms/iter (mut i32) (i32.const 0))
 (global $~lib/rt/itcms/toSpace (mut i32) (i32.const 0))
 (global $~lib/rt/itcms/white (mut i32) (i32.const 0))
 (global $~lib/rt/itcms/fromSpace (mut i32) (i32.const 0))
 (global $~lib/rt/tlsf/ROOT (mut i32) (i32.const 0))
 (global $src/views/idaStar/boardAstar/wasm/assembly/solver/finish (mut i32) (i32.const 0))
 (global $src/views/idaStar/boardAstar/wasm/assembly/solver/finishPos (mut i32) (i32.const 0))
 (global $src/views/idaStar/boardAstar/wasm/assembly/solver/startList (mut i32) (i32.const 0))
 (global $src/views/idaStar/boardAstar/wasm/assembly/solver/curList (mut i32) (i32.const 0))
 (global $src/views/idaStar/boardAstar/wasm/assembly/solver/inputBuf (mut i32) (i32.const 0))
 (global $src/views/idaStar/boardAstar/wasm/assembly/solver/focusArr (mut i32) (i32.const 0))
 (global $src/views/idaStar/boardAstar/wasm/assembly/solver/focusLen (mut i32) (i32.const 0))
 (global $src/views/idaStar/boardAstar/wasm/assembly/solver/winLefts (mut i32) (i32.const 0))
 (global $src/views/idaStar/boardAstar/wasm/assembly/solver/winTops (mut i32) (i32.const 0))
 (global $src/views/idaStar/boardAstar/wasm/assembly/solver/winWs (mut i32) (i32.const 0))
 (global $src/views/idaStar/boardAstar/wasm/assembly/solver/winHs (mut i32) (i32.const 0))
 (global $src/views/idaStar/boardAstar/wasm/assembly/solver/winCount (mut i32) (i32.const 0))
 (global $src/views/idaStar/boardAstar/wasm/assembly/solver/outActions (mut i32) (i32.const 0))
 (global $src/views/idaStar/boardAstar/wasm/assembly/solver/outActionLen (mut i32) (i32.const 0))
 (global $src/views/idaStar/boardAstar/wasm/assembly/solver/progressBuf (mut i32) (i32.const 0))
 (global $src/views/idaStar/boardAstar/wasm/assembly/solver/progressLen (mut i32) (i32.const 0))
 (global $src/views/idaStar/boardAstar/wasm/assembly/solver/stateCntTotal (mut i32) (i32.const 0))
 (global $src/views/idaStar/boardAstar/wasm/assembly/solver/expandCnt (mut i32) (i32.const 0))
 (global $src/views/idaStar/boardAstar/wasm/assembly/solver/lastError (mut i32) (i32.const 0))
 (global $~lib/memory/__stack_pointer (mut i32) (i32.const 35464))
 (memory $0 1)
 (data $0 (i32.const 1036) ",")
 (data $0.1 (i32.const 1048) "\02\00\00\00\1c\00\00\00I\00n\00v\00a\00l\00i\00d\00 \00l\00e\00n\00g\00t\00h")
 (data $1 (i32.const 1084) "<")
 (data $1.1 (i32.const 1096) "\02\00\00\00&\00\00\00~\00l\00i\00b\00/\00s\00t\00a\00t\00i\00c\00a\00r\00r\00a\00y\00.\00t\00s")
 (data $2 (i32.const 1148) "<")
 (data $2.1 (i32.const 1160) "\02\00\00\00(\00\00\00A\00l\00l\00o\00c\00a\00t\00i\00o\00n\00 \00t\00o\00o\00 \00l\00a\00r\00g\00e")
 (data $3 (i32.const 1212) "<")
 (data $3.1 (i32.const 1224) "\02\00\00\00 \00\00\00~\00l\00i\00b\00/\00r\00t\00/\00i\00t\00c\00m\00s\00.\00t\00s")
 (data $6 (i32.const 1340) "<")
 (data $6.1 (i32.const 1352) "\02\00\00\00$\00\00\00I\00n\00d\00e\00x\00 \00o\00u\00t\00 \00o\00f\00 \00r\00a\00n\00g\00e")
 (data $7 (i32.const 1404) ",")
 (data $7.1 (i32.const 1416) "\02\00\00\00\14\00\00\00~\00l\00i\00b\00/\00r\00t\00.\00t\00s")
 (data $9 (i32.const 1484) "<")
 (data $9.1 (i32.const 1496) "\02\00\00\00\1e\00\00\00~\00l\00i\00b\00/\00r\00t\00/\00t\00l\00s\00f\00.\00t\00s")
 (data $10 (i32.const 1548) "\1c")
 (data $10.1 (i32.const 1560) "\02\00\00\00\n\00\00\00s\00k\00i\00p\00:")
 (data $11 (i32.const 1580) "|")
 (data $11.1 (i32.const 1592) "\02\00\00\00d\00\00\00t\00o\00S\00t\00r\00i\00n\00g\00(\00)\00 \00r\00a\00d\00i\00x\00 \00a\00r\00g\00u\00m\00e\00n\00t\00 \00m\00u\00s\00t\00 \00b\00e\00 \00b\00e\00t\00w\00e\00e\00n\00 \002\00 \00a\00n\00d\00 \003\006")
 (data $12 (i32.const 1708) "<")
 (data $12.1 (i32.const 1720) "\02\00\00\00&\00\00\00~\00l\00i\00b\00/\00u\00t\00i\00l\00/\00n\00u\00m\00b\00e\00r\00.\00t\00s")
 (data $13 (i32.const 1772) "\1c")
 (data $13.1 (i32.const 1784) "\02\00\00\00\02\00\00\000")
 (data $14 (i32.const 1804) "\\")
 (data $14.1 (i32.const 1816) "\02\00\00\00H\00\00\000\001\002\003\004\005\006\007\008\009\00a\00b\00c\00d\00e\00f\00g\00h\00i\00j\00k\00l\00m\00n\00o\00p\00q\00r\00s\00t\00u\00v\00w\00x\00y\00z")
 (data $15 (i32.const 1900) "\1c")
 (data $15.1 (i32.const 1912) "\02")
 (data $16 (i32.const 1932) "\1c")
 (data $16.1 (i32.const 1944) "\02\00\00\00\02\00\00\00,")
 (data $17 (i32.const 1964) "\1c")
 (data $17.1 (i32.const 1976) "\02\00\00\00\02\00\00\00x")
 (data $18 (i32.const 1996) "\1c")
 (data $18.1 (i32.const 2008) "\02\00\00\00\08\00\00\00w\00i\00n\00:")
 (data $19 (i32.const 2028) "\1c")
 (data $19.1 (i32.const 2040) "\02\00\00\00\02\00\00\00/")
 (data $20 (i32.const 2060) "\1c")
 (data $20.1 (i32.const 2072) "\02\00\00\00\02\00\00\00:")
 (data $21 (i32.const 2092) "<")
 (data $21.1 (i32.const 2104) "\02\00\00\00&\00\00\00~\00l\00i\00b\00/\00a\00r\00r\00a\00y\00b\00u\00f\00f\00e\00r\00.\00t\00s")
 (data $22 (i32.const 2156) "\1c")
 (data $22.1 (i32.const 2168) "\01")
 (data $23 (i32.const 2188) ",")
 (data $23.1 (i32.const 2200) "\02\00\00\00\1a\00\00\00~\00l\00i\00b\00/\00a\00r\00r\00a\00y\00.\00t\00s")
 (data $24 (i32.const 2236) "|")
 (data $24.1 (i32.const 2248) "\02\00\00\00^\00\00\00E\00l\00e\00m\00e\00n\00t\00 \00t\00y\00p\00e\00 \00m\00u\00s\00t\00 \00b\00e\00 \00n\00u\00l\00l\00a\00b\00l\00e\00 \00i\00f\00 \00a\00r\00r\00a\00y\00 \00i\00s\00 \00h\00o\00l\00e\00y")
 (data $25 (i32.const 2364) ",")
 (data $25.1 (i32.const 2376) "\02\00\00\00\1c\00\00\00A\00r\00r\00a\00y\00 \00i\00s\00 \00e\00m\00p\00t\00y")
 (data $26 (i32.const 2412) "<")
 (data $26.1 (i32.const 2424) "\02\00\00\00$\00\00\00K\00e\00y\00 \00d\00o\00e\00s\00 \00n\00o\00t\00 \00e\00x\00i\00s\00t")
 (data $27 (i32.const 2476) ",")
 (data $27.1 (i32.const 2488) "\02\00\00\00\16\00\00\00~\00l\00i\00b\00/\00m\00a\00p\00.\00t\00s")
 (data $28 (i32.const 2524) ",")
 (data $28.1 (i32.const 2536) "\02\00\00\00\10\00\00\00w\00i\00n\00d\00o\00n\00e\00:")
 (data $29 (i32.const 2572) "\1c")
 (data $29.1 (i32.const 2584) "\02\00\00\00\04\00\00\00b\00i")
 (data $30 (i32.const 2604) "\1c")
 (data $30.1 (i32.const 2616) "\02\00\00\00\n\00\00\00d\00o\00n\00e\00:")
 (data $31 (i32.const 2640) "\r\00\00\00 \00\00\00 \00\00\00 \00\00\00\00\00\00\00d\00\00\00$\t\00\00\00\00\00\00\10A\82")
 (data $31.1 (i32.const 2684) "\02A\00\00\02\t\00\00\02A")
 (export "getInputPtr" (func $src/views/idaStar/boardAstar/wasm/assembly/solver/getInputPtr))
 (export "setWinParams" (func $src/views/idaStar/boardAstar/wasm/assembly/solver/setWinParams))
 (export "init" (func $src/views/idaStar/boardAstar/wasm/assembly/solver/init))
 (export "clearSolver" (func $src/views/idaStar/boardAstar/wasm/assembly/solver/clearSolver))
 (export "execAll" (func $src/views/idaStar/boardAstar/wasm/assembly/solver/execAll))
 (export "getActionsPtr" (func $src/views/idaStar/boardAstar/wasm/assembly/solver/getActionsPtr))
 (export "getActionsLen" (func $src/views/idaStar/boardAstar/wasm/assembly/solver/getActionsLen))
 (export "getProgressPtr" (func $src/views/idaStar/boardAstar/wasm/assembly/solver/getProgressPtr))
 (export "getProgressLen" (func $src/views/idaStar/boardAstar/wasm/assembly/solver/getProgressLen))
 (export "getStateCnt" (func $src/views/idaStar/boardAstar/wasm/assembly/solver/getStateCnt))
 (export "getWinCount" (func $src/views/idaStar/boardAstar/wasm/assembly/solver/getWinCount))
 (export "getExpandCnt" (func $src/views/idaStar/boardAstar/wasm/assembly/solver/getExpandCnt))
 (export "getLastError" (func $src/views/idaStar/boardAstar/wasm/assembly/solver/getLastError))
 (export "getWinW" (func $src/views/idaStar/boardAstar/wasm/assembly/solver/getWinW))
 (export "getWinH" (func $src/views/idaStar/boardAstar/wasm/assembly/solver/getWinH))
 (export "getWinWeight" (func $src/views/idaStar/boardAstar/wasm/assembly/solver/getWinWeight))
 (export "memory" (memory $0))
 (start $~start)
 (func $~lib/rt/itcms/initLazy (param $0 i32) (result i32)
  local.get $0
  local.get $0
  i32.store offset=4
  local.get $0
  local.get $0
  i32.store offset=8
  local.get $0
 )
 (func $~lib/rt/itcms/visitRoots
  (local $0 i32)
  (local $1 i32)
  global.get $src/views/idaStar/boardAstar/wasm/assembly/solver/finish
  local.tee $0
  if
   local.get $0
   call $~lib/rt/itcms/__visit
  end
  global.get $src/views/idaStar/boardAstar/wasm/assembly/solver/finishPos
  local.tee $0
  if
   local.get $0
   call $~lib/rt/itcms/__visit
  end
  global.get $src/views/idaStar/boardAstar/wasm/assembly/solver/startList
  local.tee $0
  if
   local.get $0
   call $~lib/rt/itcms/__visit
  end
  global.get $src/views/idaStar/boardAstar/wasm/assembly/solver/curList
  local.tee $0
  if
   local.get $0
   call $~lib/rt/itcms/__visit
  end
  global.get $src/views/idaStar/boardAstar/wasm/assembly/solver/inputBuf
  local.tee $0
  if
   local.get $0
   call $~lib/rt/itcms/__visit
  end
  global.get $src/views/idaStar/boardAstar/wasm/assembly/solver/focusArr
  local.tee $0
  if
   local.get $0
   call $~lib/rt/itcms/__visit
  end
  global.get $src/views/idaStar/boardAstar/wasm/assembly/solver/winLefts
  local.tee $0
  if
   local.get $0
   call $~lib/rt/itcms/__visit
  end
  global.get $src/views/idaStar/boardAstar/wasm/assembly/solver/winTops
  local.tee $0
  if
   local.get $0
   call $~lib/rt/itcms/__visit
  end
  global.get $src/views/idaStar/boardAstar/wasm/assembly/solver/winWs
  local.tee $0
  if
   local.get $0
   call $~lib/rt/itcms/__visit
  end
  global.get $src/views/idaStar/boardAstar/wasm/assembly/solver/winHs
  local.tee $0
  if
   local.get $0
   call $~lib/rt/itcms/__visit
  end
  global.get $src/views/idaStar/boardAstar/wasm/assembly/solver/outActions
  local.tee $0
  if
   local.get $0
   call $~lib/rt/itcms/__visit
  end
  global.get $src/views/idaStar/boardAstar/wasm/assembly/solver/progressBuf
  local.tee $0
  if
   local.get $0
   call $~lib/rt/itcms/__visit
  end
  i32.const 1360
  call $~lib/rt/itcms/__visit
  i32.const 1056
  call $~lib/rt/itcms/__visit
  i32.const 2384
  call $~lib/rt/itcms/__visit
  i32.const 2256
  call $~lib/rt/itcms/__visit
  i32.const 2432
  call $~lib/rt/itcms/__visit
  i32.const 1168
  call $~lib/rt/itcms/__visit
  i32.const 1824
  call $~lib/rt/itcms/__visit
  global.get $~lib/rt/itcms/pinSpace
  local.tee $1
  i32.load offset=4
  i32.const -4
  i32.and
  local.set $0
  loop $while-continue|0
   local.get $0
   local.get $1
   i32.ne
   if
    local.get $0
    i32.load offset=4
    i32.const 3
    i32.and
    i32.const 3
    i32.ne
    if
     i32.const 0
     i32.const 1232
     i32.const 160
     i32.const 16
     call $~lib/builtins/abort
     unreachable
    end
    local.get $0
    i32.const 20
    i32.add
    call $~lib/rt/__visit_members
    local.get $0
    i32.load offset=4
    i32.const -4
    i32.and
    local.set $0
    br $while-continue|0
   end
  end
 )
 (func $~lib/rt/itcms/Object#set:color (param $0 i32) (param $1 i32)
  local.get $0
  local.get $0
  i32.load offset=4
  i32.const -4
  i32.and
  local.get $1
  i32.or
  i32.store offset=4
 )
 (func $~lib/rt/itcms/Object#set:next (param $0 i32) (param $1 i32)
  local.get $0
  local.get $1
  local.get $0
  i32.load offset=4
  i32.const 3
  i32.and
  i32.or
  i32.store offset=4
 )
 (func $~lib/rt/itcms/Object#linkTo (param $0 i32) (param $1 i32) (param $2 i32)
  (local $3 i32)
  local.get $1
  i32.load offset=8
  local.set $3
  local.get $0
  local.get $1
  local.get $2
  i32.or
  i32.store offset=4
  local.get $0
  local.get $3
  i32.store offset=8
  local.get $3
  local.get $0
  call $~lib/rt/itcms/Object#set:next
  local.get $1
  local.get $0
  i32.store offset=8
 )
 (func $~lib/rt/itcms/Object#makeGray (param $0 i32)
  (local $1 i32)
  (local $2 i32)
  local.get $0
  global.get $~lib/rt/itcms/iter
  i32.eq
  if
   local.get $0
   i32.load offset=8
   local.tee $1
   i32.eqz
   if
    i32.const 0
    i32.const 1232
    i32.const 148
    i32.const 30
    call $~lib/builtins/abort
    unreachable
   end
   local.get $1
   global.set $~lib/rt/itcms/iter
  end
  block $__inlined_func$~lib/rt/itcms/Object#unlink$304
   local.get $0
   i32.load offset=4
   i32.const -4
   i32.and
   local.tee $1
   i32.eqz
   if
    local.get $0
    i32.load offset=8
    i32.eqz
    local.get $0
    i32.const 35464
    i32.lt_u
    i32.and
    i32.eqz
    if
     i32.const 0
     i32.const 1232
     i32.const 128
     i32.const 18
     call $~lib/builtins/abort
     unreachable
    end
    br $__inlined_func$~lib/rt/itcms/Object#unlink$304
   end
   local.get $0
   i32.load offset=8
   local.tee $2
   i32.eqz
   if
    i32.const 0
    i32.const 1232
    i32.const 132
    i32.const 16
    call $~lib/builtins/abort
    unreachable
   end
   local.get $1
   local.get $2
   i32.store offset=8
   local.get $2
   local.get $1
   call $~lib/rt/itcms/Object#set:next
  end
  global.get $~lib/rt/itcms/toSpace
  local.set $1
  local.get $0
  i32.load offset=12
  local.tee $2
  i32.const 2
  i32.le_u
  if (result i32)
   i32.const 1
  else
   local.get $2
   i32.const 2640
   i32.load
   i32.gt_u
   if
    i32.const 1360
    i32.const 1424
    i32.const 21
    i32.const 28
    call $~lib/builtins/abort
    unreachable
   end
   local.get $2
   i32.const 2
   i32.shl
   i32.const 2644
   i32.add
   i32.load
   i32.const 32
   i32.and
  end
  local.set $2
  local.get $0
  local.get $1
  global.get $~lib/rt/itcms/white
  i32.eqz
  i32.const 2
  local.get $2
  select
  call $~lib/rt/itcms/Object#linkTo
 )
 (func $~lib/rt/itcms/__visit (param $0 i32)
  local.get $0
  i32.eqz
  if
   return
  end
  global.get $~lib/rt/itcms/white
  local.get $0
  i32.const 20
  i32.sub
  local.tee $0
  i32.load offset=4
  i32.const 3
  i32.and
  i32.eq
  if
   local.get $0
   call $~lib/rt/itcms/Object#makeGray
   global.get $~lib/rt/itcms/visitCount
   i32.const 1
   i32.add
   global.set $~lib/rt/itcms/visitCount
  end
 )
 (func $~lib/rt/tlsf/removeBlock (param $0 i32) (param $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  local.get $1
  i32.load
  local.tee $3
  i32.const 1
  i32.and
  i32.eqz
  if
   i32.const 0
   i32.const 1504
   i32.const 268
   i32.const 14
   call $~lib/builtins/abort
   unreachable
  end
  local.get $3
  i32.const -4
  i32.and
  local.tee $3
  i32.const 12
  i32.lt_u
  if
   i32.const 0
   i32.const 1504
   i32.const 270
   i32.const 14
   call $~lib/builtins/abort
   unreachable
  end
  local.get $3
  i32.const 256
  i32.lt_u
  if (result i32)
   local.get $3
   i32.const 4
   i32.shr_u
  else
   i32.const 31
   i32.const 1073741820
   local.get $3
   local.get $3
   i32.const 1073741820
   i32.ge_u
   select
   local.tee $3
   i32.clz
   i32.sub
   local.tee $4
   i32.const 7
   i32.sub
   local.set $2
   local.get $3
   local.get $4
   i32.const 4
   i32.sub
   i32.shr_u
   i32.const 16
   i32.xor
  end
  local.tee $3
  i32.const 16
  i32.lt_u
  local.get $2
  i32.const 23
  i32.lt_u
  i32.and
  i32.eqz
  if
   i32.const 0
   i32.const 1504
   i32.const 284
   i32.const 14
   call $~lib/builtins/abort
   unreachable
  end
  local.get $1
  i32.load offset=8
  local.set $5
  local.get $1
  i32.load offset=4
  local.tee $4
  if
   local.get $4
   local.get $5
   i32.store offset=8
  end
  local.get $5
  if
   local.get $5
   local.get $4
   i32.store offset=4
  end
  local.get $1
  local.get $0
  local.get $2
  i32.const 4
  i32.shl
  local.get $3
  i32.add
  i32.const 2
  i32.shl
  i32.add
  local.tee $1
  i32.load offset=96
  i32.eq
  if
   local.get $1
   local.get $5
   i32.store offset=96
   local.get $5
   i32.eqz
   if
    local.get $0
    local.get $2
    i32.const 2
    i32.shl
    i32.add
    local.tee $1
    i32.load offset=4
    i32.const -2
    local.get $3
    i32.rotl
    i32.and
    local.set $3
    local.get $1
    local.get $3
    i32.store offset=4
    local.get $3
    i32.eqz
    if
     local.get $0
     local.get $0
     i32.load
     i32.const -2
     local.get $2
     i32.rotl
     i32.and
     i32.store
    end
   end
  end
 )
 (func $~lib/rt/tlsf/insertBlock (param $0 i32) (param $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  local.get $1
  i32.eqz
  if
   i32.const 0
   i32.const 1504
   i32.const 201
   i32.const 14
   call $~lib/builtins/abort
   unreachable
  end
  local.get $1
  i32.load
  local.tee $3
  i32.const 1
  i32.and
  i32.eqz
  if
   i32.const 0
   i32.const 1504
   i32.const 203
   i32.const 14
   call $~lib/builtins/abort
   unreachable
  end
  local.get $1
  i32.const 4
  i32.add
  local.get $1
  i32.load
  i32.const -4
  i32.and
  i32.add
  local.tee $4
  i32.load
  local.tee $2
  i32.const 1
  i32.and
  if
   local.get $0
   local.get $4
   call $~lib/rt/tlsf/removeBlock
   local.get $1
   local.get $3
   i32.const 4
   i32.add
   local.get $2
   i32.const -4
   i32.and
   i32.add
   local.tee $3
   i32.store
   local.get $1
   i32.const 4
   i32.add
   local.get $1
   i32.load
   i32.const -4
   i32.and
   i32.add
   local.tee $4
   i32.load
   local.set $2
  end
  local.get $3
  i32.const 2
  i32.and
  if
   local.get $1
   i32.const 4
   i32.sub
   i32.load
   local.tee $1
   i32.load
   local.tee $6
   i32.const 1
   i32.and
   i32.eqz
   if
    i32.const 0
    i32.const 1504
    i32.const 221
    i32.const 16
    call $~lib/builtins/abort
    unreachable
   end
   local.get $0
   local.get $1
   call $~lib/rt/tlsf/removeBlock
   local.get $1
   local.get $6
   i32.const 4
   i32.add
   local.get $3
   i32.const -4
   i32.and
   i32.add
   local.tee $3
   i32.store
  end
  local.get $4
  local.get $2
  i32.const 2
  i32.or
  i32.store
  local.get $3
  i32.const -4
  i32.and
  local.tee $2
  i32.const 12
  i32.lt_u
  if
   i32.const 0
   i32.const 1504
   i32.const 233
   i32.const 14
   call $~lib/builtins/abort
   unreachable
  end
  local.get $4
  local.get $1
  i32.const 4
  i32.add
  local.get $2
  i32.add
  i32.ne
  if
   i32.const 0
   i32.const 1504
   i32.const 234
   i32.const 14
   call $~lib/builtins/abort
   unreachable
  end
  local.get $4
  i32.const 4
  i32.sub
  local.get $1
  i32.store
  local.get $2
  i32.const 256
  i32.lt_u
  if (result i32)
   local.get $2
   i32.const 4
   i32.shr_u
  else
   i32.const 31
   i32.const 1073741820
   local.get $2
   local.get $2
   i32.const 1073741820
   i32.ge_u
   select
   local.tee $2
   i32.clz
   i32.sub
   local.tee $3
   i32.const 7
   i32.sub
   local.set $5
   local.get $2
   local.get $3
   i32.const 4
   i32.sub
   i32.shr_u
   i32.const 16
   i32.xor
  end
  local.tee $2
  i32.const 16
  i32.lt_u
  local.get $5
  i32.const 23
  i32.lt_u
  i32.and
  i32.eqz
  if
   i32.const 0
   i32.const 1504
   i32.const 251
   i32.const 14
   call $~lib/builtins/abort
   unreachable
  end
  local.get $0
  local.get $5
  i32.const 4
  i32.shl
  local.get $2
  i32.add
  i32.const 2
  i32.shl
  i32.add
  i32.load offset=96
  local.set $3
  local.get $1
  i32.const 0
  i32.store offset=4
  local.get $1
  local.get $3
  i32.store offset=8
  local.get $3
  if
   local.get $3
   local.get $1
   i32.store offset=4
  end
  local.get $0
  local.get $5
  i32.const 4
  i32.shl
  local.get $2
  i32.add
  i32.const 2
  i32.shl
  i32.add
  local.get $1
  i32.store offset=96
  local.get $0
  local.get $0
  i32.load
  i32.const 1
  local.get $5
  i32.shl
  i32.or
  i32.store
  local.get $0
  local.get $5
  i32.const 2
  i32.shl
  i32.add
  local.tee $0
  local.get $0
  i32.load offset=4
  i32.const 1
  local.get $2
  i32.shl
  i32.or
  i32.store offset=4
 )
 (func $~lib/rt/tlsf/addMemory (param $0 i32) (param $1 i32) (param $2 i64)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  local.get $2
  local.get $1
  i64.extend_i32_u
  i64.lt_u
  if
   i32.const 0
   i32.const 1504
   i32.const 382
   i32.const 14
   call $~lib/builtins/abort
   unreachable
  end
  local.get $1
  i32.const 19
  i32.add
  i32.const -16
  i32.and
  i32.const 4
  i32.sub
  local.set $1
  local.get $0
  i32.load offset=1568
  local.tee $3
  if
   local.get $3
   i32.const 4
   i32.add
   local.get $1
   i32.gt_u
   if
    i32.const 0
    i32.const 1504
    i32.const 389
    i32.const 16
    call $~lib/builtins/abort
    unreachable
   end
   local.get $3
   local.get $1
   i32.const 16
   i32.sub
   local.tee $5
   i32.eq
   if
    local.get $3
    i32.load
    local.set $4
    local.get $5
    local.set $1
   end
  else
   local.get $0
   i32.const 1572
   i32.add
   local.get $1
   i32.gt_u
   if
    i32.const 0
    i32.const 1504
    i32.const 402
    i32.const 5
    call $~lib/builtins/abort
    unreachable
   end
  end
  local.get $2
  i32.wrap_i64
  i32.const -16
  i32.and
  local.get $1
  i32.sub
  local.tee $3
  i32.const 20
  i32.lt_u
  if
   return
  end
  local.get $1
  local.get $4
  i32.const 2
  i32.and
  local.get $3
  i32.const 8
  i32.sub
  local.tee $3
  i32.const 1
  i32.or
  i32.or
  i32.store
  local.get $1
  i32.const 0
  i32.store offset=4
  local.get $1
  i32.const 0
  i32.store offset=8
  local.get $1
  i32.const 4
  i32.add
  local.get $3
  i32.add
  local.tee $3
  i32.const 2
  i32.store
  local.get $0
  local.get $3
  i32.store offset=1568
  local.get $0
  local.get $1
  call $~lib/rt/tlsf/insertBlock
 )
 (func $~lib/rt/tlsf/initialize
  (local $0 i32)
  (local $1 i32)
  memory.size
  local.tee $1
  i32.const 0
  i32.le_s
  if (result i32)
   i32.const 1
   local.get $1
   i32.sub
   memory.grow
   i32.const 0
   i32.lt_s
  else
   i32.const 0
  end
  if
   unreachable
  end
  i32.const 35472
  i32.const 0
  i32.store
  i32.const 37040
  i32.const 0
  i32.store
  loop $for-loop|0
   local.get $0
   i32.const 23
   i32.lt_u
   if
    local.get $0
    i32.const 2
    i32.shl
    i32.const 35472
    i32.add
    i32.const 0
    i32.store offset=4
    i32.const 0
    local.set $1
    loop $for-loop|1
     local.get $1
     i32.const 16
     i32.lt_u
     if
      local.get $0
      i32.const 4
      i32.shl
      local.get $1
      i32.add
      i32.const 2
      i32.shl
      i32.const 35472
      i32.add
      i32.const 0
      i32.store offset=96
      local.get $1
      i32.const 1
      i32.add
      local.set $1
      br $for-loop|1
     end
    end
    local.get $0
    i32.const 1
    i32.add
    local.set $0
    br $for-loop|0
   end
  end
  i32.const 35472
  i32.const 37044
  memory.size
  i64.extend_i32_s
  i64.const 16
  i64.shl
  call $~lib/rt/tlsf/addMemory
  i32.const 35472
  global.set $~lib/rt/tlsf/ROOT
 )
 (func $~lib/rt/itcms/step (result i32)
  (local $0 i32)
  (local $1 i32)
  (local $2 i32)
  block $break|0
   block $case2|0
    block $case1|0
     block $case0|0
      global.get $~lib/rt/itcms/state
      br_table $case0|0 $case1|0 $case2|0 $break|0
     end
     i32.const 1
     global.set $~lib/rt/itcms/state
     i32.const 0
     global.set $~lib/rt/itcms/visitCount
     call $~lib/rt/itcms/visitRoots
     global.get $~lib/rt/itcms/toSpace
     global.set $~lib/rt/itcms/iter
     global.get $~lib/rt/itcms/visitCount
     return
    end
    global.get $~lib/rt/itcms/white
    i32.eqz
    local.set $1
    global.get $~lib/rt/itcms/iter
    i32.load offset=4
    i32.const -4
    i32.and
    local.set $0
    loop $while-continue|1
     local.get $0
     global.get $~lib/rt/itcms/toSpace
     i32.ne
     if
      local.get $0
      global.set $~lib/rt/itcms/iter
      local.get $1
      local.get $0
      i32.load offset=4
      i32.const 3
      i32.and
      i32.ne
      if
       local.get $0
       local.get $1
       call $~lib/rt/itcms/Object#set:color
       i32.const 0
       global.set $~lib/rt/itcms/visitCount
       local.get $0
       i32.const 20
       i32.add
       call $~lib/rt/__visit_members
       global.get $~lib/rt/itcms/visitCount
       return
      end
      local.get $0
      i32.load offset=4
      i32.const -4
      i32.and
      local.set $0
      br $while-continue|1
     end
    end
    i32.const 0
    global.set $~lib/rt/itcms/visitCount
    call $~lib/rt/itcms/visitRoots
    global.get $~lib/rt/itcms/toSpace
    global.get $~lib/rt/itcms/iter
    i32.load offset=4
    i32.const -4
    i32.and
    i32.eq
    if
     global.get $~lib/memory/__stack_pointer
     local.set $0
     loop $while-continue|0
      local.get $0
      i32.const 35464
      i32.lt_u
      if
       local.get $0
       i32.load
       call $~lib/rt/itcms/__visit
       local.get $0
       i32.const 4
       i32.add
       local.set $0
       br $while-continue|0
      end
     end
     global.get $~lib/rt/itcms/iter
     i32.load offset=4
     i32.const -4
     i32.and
     local.set $0
     loop $while-continue|2
      local.get $0
      global.get $~lib/rt/itcms/toSpace
      i32.ne
      if
       local.get $1
       local.get $0
       i32.load offset=4
       i32.const 3
       i32.and
       i32.ne
       if
        local.get $0
        local.get $1
        call $~lib/rt/itcms/Object#set:color
        local.get $0
        i32.const 20
        i32.add
        call $~lib/rt/__visit_members
       end
       local.get $0
       i32.load offset=4
       i32.const -4
       i32.and
       local.set $0
       br $while-continue|2
      end
     end
     global.get $~lib/rt/itcms/fromSpace
     local.set $0
     global.get $~lib/rt/itcms/toSpace
     global.set $~lib/rt/itcms/fromSpace
     local.get $0
     global.set $~lib/rt/itcms/toSpace
     local.get $1
     global.set $~lib/rt/itcms/white
     local.get $0
     i32.load offset=4
     i32.const -4
     i32.and
     global.set $~lib/rt/itcms/iter
     i32.const 2
     global.set $~lib/rt/itcms/state
    end
    global.get $~lib/rt/itcms/visitCount
    return
   end
   global.get $~lib/rt/itcms/iter
   local.tee $0
   global.get $~lib/rt/itcms/toSpace
   i32.ne
   if
    local.get $0
    i32.load offset=4
    i32.const -4
    i32.and
    global.set $~lib/rt/itcms/iter
    global.get $~lib/rt/itcms/white
    i32.eqz
    local.get $0
    i32.load offset=4
    i32.const 3
    i32.and
    i32.ne
    if
     i32.const 0
     i32.const 1232
     i32.const 229
     i32.const 20
     call $~lib/builtins/abort
     unreachable
    end
    local.get $0
    i32.const 35464
    i32.lt_u
    if
     local.get $0
     i32.const 0
     i32.store offset=4
     local.get $0
     i32.const 0
     i32.store offset=8
    else
     global.get $~lib/rt/itcms/total
     local.get $0
     i32.load
     i32.const -4
     i32.and
     i32.const 4
     i32.add
     i32.sub
     global.set $~lib/rt/itcms/total
     local.get $0
     i32.const 4
     i32.add
     local.tee $1
     i32.const 35464
     i32.ge_u
     if
      global.get $~lib/rt/tlsf/ROOT
      i32.eqz
      if
       call $~lib/rt/tlsf/initialize
      end
      global.get $~lib/rt/tlsf/ROOT
      local.set $2
      local.get $1
      i32.const 4
      i32.sub
      local.set $0
      local.get $1
      i32.const 15
      i32.and
      i32.const 1
      local.get $1
      select
      if (result i32)
       i32.const 1
      else
       local.get $0
       i32.load
       i32.const 1
       i32.and
      end
      if
       i32.const 0
       i32.const 1504
       i32.const 562
       i32.const 3
       call $~lib/builtins/abort
       unreachable
      end
      local.get $0
      local.get $0
      i32.load
      i32.const 1
      i32.or
      i32.store
      local.get $2
      local.get $0
      call $~lib/rt/tlsf/insertBlock
     end
    end
    i32.const 10
    return
   end
   global.get $~lib/rt/itcms/toSpace
   global.get $~lib/rt/itcms/toSpace
   i32.store offset=4
   global.get $~lib/rt/itcms/toSpace
   global.get $~lib/rt/itcms/toSpace
   i32.store offset=8
   i32.const 0
   global.set $~lib/rt/itcms/state
  end
  i32.const 0
 )
 (func $~lib/rt/tlsf/roundSize (param $0 i32) (result i32)
  local.get $0
  i32.const 536870910
  i32.lt_u
  if (result i32)
   local.get $0
   i32.const 1
   i32.const 27
   local.get $0
   i32.clz
   i32.sub
   i32.shl
   i32.add
   i32.const 1
   i32.sub
  else
   local.get $0
  end
 )
 (func $~lib/rt/tlsf/searchBlock (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  (local $3 i32)
  local.get $1
  i32.const 256
  i32.lt_u
  if (result i32)
   local.get $1
   i32.const 4
   i32.shr_u
  else
   i32.const 31
   local.get $1
   call $~lib/rt/tlsf/roundSize
   local.tee $1
   i32.clz
   i32.sub
   local.tee $3
   i32.const 7
   i32.sub
   local.set $2
   local.get $1
   local.get $3
   i32.const 4
   i32.sub
   i32.shr_u
   i32.const 16
   i32.xor
  end
  local.tee $1
  i32.const 16
  i32.lt_u
  local.get $2
  i32.const 23
  i32.lt_u
  i32.and
  i32.eqz
  if
   i32.const 0
   i32.const 1504
   i32.const 334
   i32.const 14
   call $~lib/builtins/abort
   unreachable
  end
  local.get $0
  local.get $2
  i32.const 2
  i32.shl
  i32.add
  i32.load offset=4
  i32.const -1
  local.get $1
  i32.shl
  i32.and
  local.tee $1
  if (result i32)
   local.get $0
   local.get $1
   i32.ctz
   local.get $2
   i32.const 4
   i32.shl
   i32.add
   i32.const 2
   i32.shl
   i32.add
   i32.load offset=96
  else
   local.get $0
   i32.load
   i32.const -1
   local.get $2
   i32.const 1
   i32.add
   i32.shl
   i32.and
   local.tee $1
   if (result i32)
    local.get $0
    local.get $1
    i32.ctz
    local.tee $1
    i32.const 2
    i32.shl
    i32.add
    i32.load offset=4
    local.tee $2
    i32.eqz
    if
     i32.const 0
     i32.const 1504
     i32.const 347
     i32.const 18
     call $~lib/builtins/abort
     unreachable
    end
    local.get $0
    local.get $2
    i32.ctz
    local.get $1
    i32.const 4
    i32.shl
    i32.add
    i32.const 2
    i32.shl
    i32.add
    i32.load offset=96
   else
    i32.const 0
   end
  end
 )
 (func $~lib/rt/tlsf/allocateBlock (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  local.get $1
  i32.const 1073741820
  i32.gt_u
  if
   i32.const 1168
   i32.const 1504
   i32.const 461
   i32.const 29
   call $~lib/builtins/abort
   unreachable
  end
  local.get $0
  i32.const 12
  local.get $1
  i32.const 19
  i32.add
  i32.const -16
  i32.and
  i32.const 4
  i32.sub
  local.get $1
  i32.const 12
  i32.le_u
  select
  local.tee $1
  call $~lib/rt/tlsf/searchBlock
  local.tee $2
  i32.eqz
  if
   local.get $1
   i32.const 256
   i32.ge_u
   if (result i32)
    local.get $1
    call $~lib/rt/tlsf/roundSize
   else
    local.get $1
   end
   local.set $2
   memory.size
   local.tee $3
   local.get $2
   i32.const 4
   local.get $0
   i32.load offset=1568
   local.get $3
   i32.const 16
   i32.shl
   i32.const 4
   i32.sub
   i32.ne
   i32.shl
   i32.add
   i32.const 65535
   i32.add
   i32.const -65536
   i32.and
   i32.const 16
   i32.shr_u
   local.tee $2
   local.get $2
   local.get $3
   i32.lt_s
   select
   memory.grow
   i32.const 0
   i32.lt_s
   if
    local.get $2
    memory.grow
    i32.const 0
    i32.lt_s
    if
     unreachable
    end
   end
   local.get $0
   local.get $3
   i32.const 16
   i32.shl
   memory.size
   i64.extend_i32_s
   i64.const 16
   i64.shl
   call $~lib/rt/tlsf/addMemory
   local.get $0
   local.get $1
   call $~lib/rt/tlsf/searchBlock
   local.tee $2
   i32.eqz
   if
    i32.const 0
    i32.const 1504
    i32.const 499
    i32.const 16
    call $~lib/builtins/abort
    unreachable
   end
  end
  local.get $1
  local.get $2
  i32.load
  i32.const -4
  i32.and
  i32.gt_u
  if
   i32.const 0
   i32.const 1504
   i32.const 501
   i32.const 14
   call $~lib/builtins/abort
   unreachable
  end
  local.get $0
  local.get $2
  call $~lib/rt/tlsf/removeBlock
  local.get $2
  i32.load
  local.set $4
  local.get $1
  i32.const 4
  i32.add
  i32.const 15
  i32.and
  if
   i32.const 0
   i32.const 1504
   i32.const 361
   i32.const 14
   call $~lib/builtins/abort
   unreachable
  end
  local.get $4
  i32.const -4
  i32.and
  local.get $1
  i32.sub
  local.tee $3
  i32.const 16
  i32.ge_u
  if
   local.get $2
   local.get $1
   local.get $4
   i32.const 2
   i32.and
   i32.or
   i32.store
   local.get $2
   i32.const 4
   i32.add
   local.get $1
   i32.add
   local.tee $1
   local.get $3
   i32.const 4
   i32.sub
   i32.const 1
   i32.or
   i32.store
   local.get $0
   local.get $1
   call $~lib/rt/tlsf/insertBlock
  else
   local.get $2
   local.get $4
   i32.const -2
   i32.and
   i32.store
   local.get $2
   i32.const 4
   i32.add
   local.get $2
   i32.load
   i32.const -4
   i32.and
   i32.add
   local.tee $0
   local.get $0
   i32.load
   i32.const -3
   i32.and
   i32.store
  end
  local.get $2
 )
 (func $~lib/rt/itcms/__new (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  local.get $0
  i32.const 1073741804
  i32.ge_u
  if
   i32.const 1168
   i32.const 1232
   i32.const 261
   i32.const 31
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/rt/itcms/total
  global.get $~lib/rt/itcms/threshold
  i32.ge_u
  if
   block $__inlined_func$~lib/rt/itcms/interrupt$67
    i32.const 2048
    local.set $2
    loop $do-loop|0
     local.get $2
     call $~lib/rt/itcms/step
     i32.sub
     local.set $2
     global.get $~lib/rt/itcms/state
     i32.eqz
     if
      global.get $~lib/rt/itcms/total
      i64.extend_i32_u
      i64.const 200
      i64.mul
      i64.const 100
      i64.div_u
      i32.wrap_i64
      i32.const 1024
      i32.add
      global.set $~lib/rt/itcms/threshold
      br $__inlined_func$~lib/rt/itcms/interrupt$67
     end
     local.get $2
     i32.const 0
     i32.gt_s
     br_if $do-loop|0
    end
    global.get $~lib/rt/itcms/total
    global.get $~lib/rt/itcms/total
    global.get $~lib/rt/itcms/threshold
    i32.sub
    i32.const 1024
    i32.lt_u
    i32.const 10
    i32.shl
    i32.add
    global.set $~lib/rt/itcms/threshold
   end
  end
  global.get $~lib/rt/tlsf/ROOT
  i32.eqz
  if
   call $~lib/rt/tlsf/initialize
  end
  global.get $~lib/rt/tlsf/ROOT
  local.get $0
  i32.const 16
  i32.add
  call $~lib/rt/tlsf/allocateBlock
  local.tee $2
  local.get $1
  i32.store offset=12
  local.get $2
  local.get $0
  i32.store offset=16
  local.get $2
  global.get $~lib/rt/itcms/fromSpace
  global.get $~lib/rt/itcms/white
  call $~lib/rt/itcms/Object#linkTo
  global.get $~lib/rt/itcms/total
  local.get $2
  i32.load
  i32.const -4
  i32.and
  i32.const 4
  i32.add
  i32.add
  global.set $~lib/rt/itcms/total
  local.get $2
  i32.const 20
  i32.add
  local.tee $1
  i32.const 0
  local.get $0
  memory.fill
  local.get $1
 )
 (func $src/views/idaStar/boardAstar/wasm/assembly/solver/getInputPtr (result i32)
  global.get $src/views/idaStar/boardAstar/wasm/assembly/solver/inputBuf
 )
 (func $src/views/idaStar/boardAstar/wasm/assembly/solver/setWinParams (param $0 i32) (param $1 i32) (param $2 f64)
  i32.const 1
  local.get $0
  local.get $0
  i32.const 0
  i32.le_s
  select
  global.set $src/views/idaStar/boardAstar/wasm/assembly/solver/winW
  i32.const 1
  local.get $1
  local.get $1
  i32.const 0
  i32.le_s
  select
  global.set $src/views/idaStar/boardAstar/wasm/assembly/solver/winH
  local.get $2
  f64.const 0
  f64.gt
  if
   local.get $2
   global.set $src/views/idaStar/boardAstar/wasm/assembly/solver/winWeight
  end
 )
 (func $src/views/idaStar/boardAstar/wasm/assembly/solver/clearSolver
  i32.const 0
  global.set $src/views/idaStar/boardAstar/wasm/assembly/solver/outActionLen
  i32.const 0
  global.set $src/views/idaStar/boardAstar/wasm/assembly/solver/focusLen
  i32.const 0
  global.set $src/views/idaStar/boardAstar/wasm/assembly/solver/stateCntTotal
  i32.const 0
  global.set $src/views/idaStar/boardAstar/wasm/assembly/solver/expandCnt
  i32.const 0
  global.set $src/views/idaStar/boardAstar/wasm/assembly/solver/lastError
  i32.const 0
  global.set $src/views/idaStar/boardAstar/wasm/assembly/solver/progressLen
 )
 (func $~lib/rt/itcms/__link (param $0 i32) (param $1 i32) (param $2 i32)
  (local $3 i32)
  local.get $1
  i32.eqz
  if
   return
  end
  local.get $0
  i32.eqz
  if
   i32.const 0
   i32.const 1232
   i32.const 295
   i32.const 14
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/rt/itcms/white
  local.get $1
  i32.const 20
  i32.sub
  local.tee $1
  i32.load offset=4
  i32.const 3
  i32.and
  i32.eq
  if
   local.get $0
   i32.const 20
   i32.sub
   local.tee $0
   i32.load offset=4
   i32.const 3
   i32.and
   local.tee $3
   global.get $~lib/rt/itcms/white
   i32.eqz
   i32.eq
   if
    local.get $0
    local.get $1
    local.get $2
    select
    call $~lib/rt/itcms/Object#makeGray
   else
    global.get $~lib/rt/itcms/state
    i32.const 1
    i32.eq
    local.get $3
    i32.const 3
    i32.eq
    i32.and
    if
     local.get $1
     call $~lib/rt/itcms/Object#makeGray
    end
   end
  end
 )
 (func $"~lib/map/Map<~lib/string/String,src/views/idaStar/boardAstar/wasm/assembly/solver/Node>#set:buckets" (param $0 i32) (param $1 i32)
  local.get $0
  local.get $1
  i32.store
  local.get $0
  local.get $1
  i32.const 0
  call $~lib/rt/itcms/__link
 )
 (func $"~lib/map/Map<~lib/string/String,src/views/idaStar/boardAstar/wasm/assembly/solver/Node>#set:entries" (param $0 i32) (param $1 i32)
  local.get $0
  local.get $1
  i32.store offset=8
  local.get $0
  local.get $1
  i32.const 0
  call $~lib/rt/itcms/__link
 )
 (func $src/views/idaStar/boardAstar/wasm/assembly/solver/Node#set:parentKey (param $0 i32) (param $1 i32)
  local.get $0
  local.get $1
  i32.store offset=12
  local.get $0
  local.get $1
  i32.const 0
  call $~lib/rt/itcms/__link
 )
 (func $src/views/idaStar/boardAstar/wasm/assembly/solver/reverseDir (param $0 i32) (result i32)
  local.get $0
  i32.eqz
  if
   i32.const 2
   return
  end
  local.get $0
  i32.const 2
  i32.eq
  if
   i32.const 0
   return
  end
  local.get $0
  i32.const 3
  i32.eq
  if
   i32.const 1
   return
  end
  i32.const 3
 )
 (func $src/views/idaStar/boardAstar/wasm/assembly/solver/canMove (param $0 i32) (param $1 i32) (result i32)
  local.get $1
  i32.eqz
  if
   local.get $0
   global.get $src/views/idaStar/boardAstar/wasm/assembly/solver/width
   i32.ge_s
   return
  end
  local.get $1
  i32.const 1
  i32.eq
  if
   global.get $src/views/idaStar/boardAstar/wasm/assembly/solver/width
   i32.const 1
   i32.sub
   local.get $0
   global.get $src/views/idaStar/boardAstar/wasm/assembly/solver/width
   i32.rem_s
   i32.ne
   return
  end
  local.get $1
  i32.const 2
  i32.eq
  if
   global.get $src/views/idaStar/boardAstar/wasm/assembly/solver/n
   local.get $0
   global.get $src/views/idaStar/boardAstar/wasm/assembly/solver/width
   i32.add
   i32.gt_s
   return
  end
  local.get $1
  i32.const 3
  i32.eq
  if
   local.get $0
   global.get $src/views/idaStar/boardAstar/wasm/assembly/solver/width
   i32.rem_s
   i32.const 0
   i32.ne
   return
  end
  i32.const 0
 )
 (func $src/views/idaStar/boardAstar/wasm/assembly/solver/getActionsPtr (result i32)
  global.get $src/views/idaStar/boardAstar/wasm/assembly/solver/outActions
 )
 (func $src/views/idaStar/boardAstar/wasm/assembly/solver/getActionsLen (result i32)
  global.get $src/views/idaStar/boardAstar/wasm/assembly/solver/outActionLen
 )
 (func $src/views/idaStar/boardAstar/wasm/assembly/solver/getProgressPtr (result i32)
  global.get $src/views/idaStar/boardAstar/wasm/assembly/solver/progressBuf
 )
 (func $src/views/idaStar/boardAstar/wasm/assembly/solver/getProgressLen (result i32)
  global.get $src/views/idaStar/boardAstar/wasm/assembly/solver/progressLen
 )
 (func $src/views/idaStar/boardAstar/wasm/assembly/solver/getStateCnt (result i32)
  global.get $src/views/idaStar/boardAstar/wasm/assembly/solver/stateCntTotal
 )
 (func $src/views/idaStar/boardAstar/wasm/assembly/solver/getWinCount (result i32)
  global.get $src/views/idaStar/boardAstar/wasm/assembly/solver/winCount
 )
 (func $src/views/idaStar/boardAstar/wasm/assembly/solver/getExpandCnt (result i32)
  global.get $src/views/idaStar/boardAstar/wasm/assembly/solver/expandCnt
 )
 (func $src/views/idaStar/boardAstar/wasm/assembly/solver/getLastError (result i32)
  global.get $src/views/idaStar/boardAstar/wasm/assembly/solver/lastError
 )
 (func $src/views/idaStar/boardAstar/wasm/assembly/solver/getWinW (result i32)
  global.get $src/views/idaStar/boardAstar/wasm/assembly/solver/winW
 )
 (func $src/views/idaStar/boardAstar/wasm/assembly/solver/getWinH (result i32)
  global.get $src/views/idaStar/boardAstar/wasm/assembly/solver/winH
 )
 (func $src/views/idaStar/boardAstar/wasm/assembly/solver/getWinWeight (result f64)
  global.get $src/views/idaStar/boardAstar/wasm/assembly/solver/winWeight
 )
 (func $~lib/array/Array<src/views/idaStar/boardAstar/wasm/assembly/solver/HeapItem>~visit (param $0 i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $0
  i32.load offset=4
  local.set $1
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $1
  local.get $0
  i32.load offset=12
  i32.const 2
  i32.shl
  i32.add
  local.set $2
  loop $while-continue|0
   local.get $1
   local.get $2
   i32.lt_u
   if
    local.get $1
    i32.load
    local.tee $3
    if
     local.get $3
     call $~lib/rt/itcms/__visit
    end
    local.get $1
    i32.const 4
    i32.add
    local.set $1
    br $while-continue|0
   end
  end
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $0
  i32.load
  call $~lib/rt/itcms/__visit
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
 (func $~lib/rt/__visit_members (param $0 i32)
  (local $1 i32)
  (local $2 i32)
  block $folding-inner0
   block $invalid
    block $~lib/array/Array<~lib/string/String>
     block $~lib/array/Array<i32>
      block $~lib/array/Array<src/views/idaStar/boardAstar/wasm/assembly/solver/HeapItem>
       block $"~lib/map/Map<~lib/string/String,src/views/idaStar/boardAstar/wasm/assembly/solver/Node>"
        block $src/views/idaStar/boardAstar/wasm/assembly/solver/Node
         block $~lib/staticarray/StaticArray<i32>
          block $~lib/staticarray/StaticArray<u8>
           block $~lib/string/String
            block $~lib/arraybuffer/ArrayBuffer
             block $~lib/object/Object
              local.get $0
              i32.const 8
              i32.sub
              i32.load
              br_table $~lib/object/Object $~lib/arraybuffer/ArrayBuffer $~lib/string/String $folding-inner0 $~lib/staticarray/StaticArray<u8> $~lib/staticarray/StaticArray<i32> $src/views/idaStar/boardAstar/wasm/assembly/solver/Node $"~lib/map/Map<~lib/string/String,src/views/idaStar/boardAstar/wasm/assembly/solver/Node>" $folding-inner0 $folding-inner0 $~lib/array/Array<src/views/idaStar/boardAstar/wasm/assembly/solver/HeapItem> $~lib/array/Array<i32> $~lib/array/Array<~lib/string/String> $invalid
             end
             return
            end
            return
           end
           return
          end
          return
         end
         return
        end
        local.get $0
        i32.load offset=12
        local.tee $0
        if
         local.get $0
         call $~lib/rt/itcms/__visit
        end
        return
       end
       global.get $~lib/memory/__stack_pointer
       i32.const 4
       i32.sub
       global.set $~lib/memory/__stack_pointer
       call $~stack_check
       global.get $~lib/memory/__stack_pointer
       i32.const 0
       i32.store
       global.get $~lib/memory/__stack_pointer
       local.get $0
       i32.store
       local.get $0
       i32.load
       call $~lib/rt/itcms/__visit
       global.get $~lib/memory/__stack_pointer
       local.get $0
       i32.store
       local.get $0
       i32.load offset=8
       local.tee $2
       local.set $1
       global.get $~lib/memory/__stack_pointer
       local.get $0
       i32.store
       local.get $1
       local.get $0
       i32.load offset=16
       i32.const 12
       i32.mul
       i32.add
       local.set $0
       loop $while-continue|0
        local.get $0
        local.get $1
        i32.gt_u
        if
         local.get $1
         i32.load offset=8
         i32.const 1
         i32.and
         i32.eqz
         if
          local.get $1
          i32.load
          call $~lib/rt/itcms/__visit
          local.get $1
          i32.load offset=4
          call $~lib/rt/itcms/__visit
         end
         local.get $1
         i32.const 12
         i32.add
         local.set $1
         br $while-continue|0
        end
       end
       local.get $2
       call $~lib/rt/itcms/__visit
       global.get $~lib/memory/__stack_pointer
       i32.const 4
       i32.add
       global.set $~lib/memory/__stack_pointer
       return
      end
      local.get $0
      call $~lib/array/Array<src/views/idaStar/boardAstar/wasm/assembly/solver/HeapItem>~visit
      return
     end
     global.get $~lib/memory/__stack_pointer
     i32.const 4
     i32.sub
     global.set $~lib/memory/__stack_pointer
     call $~stack_check
     global.get $~lib/memory/__stack_pointer
     i32.const 0
     i32.store
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store
     local.get $0
     i32.load
     call $~lib/rt/itcms/__visit
     global.get $~lib/memory/__stack_pointer
     i32.const 4
     i32.add
     global.set $~lib/memory/__stack_pointer
     return
    end
    local.get $0
    call $~lib/array/Array<src/views/idaStar/boardAstar/wasm/assembly/solver/HeapItem>~visit
    return
   end
   unreachable
  end
  local.get $0
  i32.load
  local.tee $0
  if
   local.get $0
   call $~lib/rt/itcms/__visit
  end
 )
 (func $~start
  memory.size
  i32.const 16
  i32.shl
  i32.const 35464
  i32.sub
  i32.const 1
  i32.shr_u
  global.set $~lib/rt/itcms/threshold
  i32.const 1280
  call $~lib/rt/itcms/initLazy
  global.set $~lib/rt/itcms/pinSpace
  i32.const 1312
  call $~lib/rt/itcms/initLazy
  global.set $~lib/rt/itcms/toSpace
  i32.const 1456
  call $~lib/rt/itcms/initLazy
  global.set $~lib/rt/itcms/fromSpace
  i32.const 64
  call $~lib/staticarray/StaticArray<u8>#constructor
  global.set $src/views/idaStar/boardAstar/wasm/assembly/solver/finish
  i32.const 64
  call $~lib/staticarray/StaticArray<i32>#constructor
  global.set $src/views/idaStar/boardAstar/wasm/assembly/solver/finishPos
  i32.const 64
  call $~lib/staticarray/StaticArray<u8>#constructor
  global.set $src/views/idaStar/boardAstar/wasm/assembly/solver/startList
  i32.const 64
  call $~lib/staticarray/StaticArray<u8>#constructor
  global.set $src/views/idaStar/boardAstar/wasm/assembly/solver/curList
  i32.const 64
  call $~lib/staticarray/StaticArray<u8>#constructor
  global.set $src/views/idaStar/boardAstar/wasm/assembly/solver/inputBuf
  i32.const 64
  call $~lib/staticarray/StaticArray<i32>#constructor
  global.set $src/views/idaStar/boardAstar/wasm/assembly/solver/focusArr
  i32.const 128
  call $~lib/staticarray/StaticArray<i32>#constructor
  global.set $src/views/idaStar/boardAstar/wasm/assembly/solver/winLefts
  i32.const 128
  call $~lib/staticarray/StaticArray<i32>#constructor
  global.set $src/views/idaStar/boardAstar/wasm/assembly/solver/winTops
  i32.const 128
  call $~lib/staticarray/StaticArray<i32>#constructor
  global.set $src/views/idaStar/boardAstar/wasm/assembly/solver/winWs
  i32.const 128
  call $~lib/staticarray/StaticArray<i32>#constructor
  global.set $src/views/idaStar/boardAstar/wasm/assembly/solver/winHs
  i32.const 200000
  call $~lib/staticarray/StaticArray<u8>#constructor
  global.set $src/views/idaStar/boardAstar/wasm/assembly/solver/outActions
  i32.const 256
  call $~lib/staticarray/StaticArray<u8>#constructor
  global.set $src/views/idaStar/boardAstar/wasm/assembly/solver/progressBuf
 )
 (func $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 2696
  i32.lt_s
  if
   i32.const 35488
   i32.const 35536
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
 )
 (func $~lib/staticarray/StaticArray<u8>#__get (param $0 i32) (param $1 i32) (result i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $1
  local.get $0
  i32.const 20
  i32.sub
  i32.load offset=16
  i32.ge_u
  if
   i32.const 1360
   i32.const 1104
   i32.const 78
   i32.const 41
   call $~lib/builtins/abort
   unreachable
  end
  local.get $0
  local.get $1
  i32.add
  i32.load8_u
  local.set $0
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $~lib/staticarray/StaticArray<u8>#__set (param $0 i32) (param $1 i32) (param $2 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $1
  local.get $0
  i32.const 20
  i32.sub
  i32.load offset=16
  i32.ge_u
  if
   i32.const 1360
   i32.const 1104
   i32.const 93
   i32.const 41
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $0
  local.get $1
  i32.add
  local.get $2
  i32.store8
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
 (func $~lib/staticarray/StaticArray<i32>#__set (param $0 i32) (param $1 i32) (param $2 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $1
  local.get $0
  i32.const 20
  i32.sub
  i32.load offset=16
  i32.const 2
  i32.shr_u
  i32.ge_u
  if
   i32.const 1360
   i32.const 1104
   i32.const 93
   i32.const 41
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $0
  local.get $1
  i32.const 2
  i32.shl
  i32.add
  local.get $2
  i32.store
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
 (func $src/views/idaStar/boardAstar/wasm/assembly/solver/init (param $0 i32) (param $1 i32) (param $2 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store
  local.get $0
  global.set $src/views/idaStar/boardAstar/wasm/assembly/solver/width
  local.get $1
  global.set $src/views/idaStar/boardAstar/wasm/assembly/solver/height
  local.get $0
  local.get $1
  i32.mul
  global.set $src/views/idaStar/boardAstar/wasm/assembly/solver/n
  global.get $src/views/idaStar/boardAstar/wasm/assembly/solver/n
  i32.const 1
  i32.sub
  global.set $src/views/idaStar/boardAstar/wasm/assembly/solver/emptyNum
  i32.const 0
  global.set $src/views/idaStar/boardAstar/wasm/assembly/solver/lastError
  i32.const 0
  global.set $src/views/idaStar/boardAstar/wasm/assembly/solver/stateCntTotal
  i32.const 0
  global.set $src/views/idaStar/boardAstar/wasm/assembly/solver/expandCnt
  i32.const 0
  global.set $src/views/idaStar/boardAstar/wasm/assembly/solver/outActionLen
  i32.const 0
  global.set $src/views/idaStar/boardAstar/wasm/assembly/solver/focusLen
  local.get $2
  global.get $src/views/idaStar/boardAstar/wasm/assembly/solver/n
  i32.ne
  global.get $src/views/idaStar/boardAstar/wasm/assembly/solver/n
  i32.const 0
  i32.le_s
  i32.or
  global.get $src/views/idaStar/boardAstar/wasm/assembly/solver/n
  i32.const 64
  i32.gt_s
  i32.or
  if
   i32.const 1
   global.set $src/views/idaStar/boardAstar/wasm/assembly/solver/lastError
   global.get $~lib/memory/__stack_pointer
   i32.const 8
   i32.add
   global.set $~lib/memory/__stack_pointer
   return
  end
  i32.const 0
  local.set $0
  loop $for-loop|0
   local.get $0
   global.get $src/views/idaStar/boardAstar/wasm/assembly/solver/n
   i32.lt_s
   if
    global.get $~lib/memory/__stack_pointer
    global.get $src/views/idaStar/boardAstar/wasm/assembly/solver/inputBuf
    local.tee $1
    i32.store
    local.get $1
    local.get $0
    call $~lib/staticarray/StaticArray<u8>#__get
    local.set $1
    global.get $~lib/memory/__stack_pointer
    global.get $src/views/idaStar/boardAstar/wasm/assembly/solver/startList
    local.tee $2
    i32.store
    local.get $2
    local.get $0
    local.get $1
    call $~lib/staticarray/StaticArray<u8>#__set
    global.get $~lib/memory/__stack_pointer
    global.get $src/views/idaStar/boardAstar/wasm/assembly/solver/curList
    local.tee $2
    i32.store
    local.get $2
    local.get $0
    local.get $1
    call $~lib/staticarray/StaticArray<u8>#__set
    global.get $~lib/memory/__stack_pointer
    global.get $src/views/idaStar/boardAstar/wasm/assembly/solver/finish
    local.tee $1
    i32.store
    local.get $1
    local.get $0
    local.get $0
    call $~lib/staticarray/StaticArray<u8>#__set
    local.get $0
    i32.const 1
    i32.add
    local.set $0
    br $for-loop|0
   end
  end
  i32.const 0
  local.set $0
  loop $for-loop|1
   local.get $0
   global.get $src/views/idaStar/boardAstar/wasm/assembly/solver/n
   i32.lt_s
   if
    global.get $~lib/memory/__stack_pointer
    global.get $src/views/idaStar/boardAstar/wasm/assembly/solver/finishPos
    local.tee $1
    i32.store
    global.get $~lib/memory/__stack_pointer
    global.get $src/views/idaStar/boardAstar/wasm/assembly/solver/finish
    local.tee $2
    i32.store offset=4
    local.get $1
    local.get $2
    local.get $0
    call $~lib/staticarray/StaticArray<u8>#__get
    local.get $0
    call $~lib/staticarray/StaticArray<i32>#__set
    local.get $0
    i32.const 1
    i32.add
    local.set $0
    br $for-loop|1
   end
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
 (func $~lib/staticarray/StaticArray<i32>#__get (param $0 i32) (param $1 i32) (result i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $1
  local.get $0
  i32.const 20
  i32.sub
  i32.load offset=16
  i32.const 2
  i32.shr_u
  i32.ge_u
  if
   i32.const 1360
   i32.const 1104
   i32.const 78
   i32.const 41
   call $~lib/builtins/abort
   unreachable
  end
  local.get $0
  local.get $1
  i32.const 2
  i32.shl
  i32.add
  i32.load
  local.set $0
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $src/views/idaStar/boardAstar/wasm/assembly/solver/buildWindows
  (local $0 i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  (local $8 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  i32.const 0
  global.set $src/views/idaStar/boardAstar/wasm/assembly/solver/winCount
  global.get $src/views/idaStar/boardAstar/wasm/assembly/solver/winW
  local.tee $1
  global.get $src/views/idaStar/boardAstar/wasm/assembly/solver/width
  local.tee $0
  local.get $0
  local.get $1
  i32.gt_s
  select
  local.set $7
  global.get $src/views/idaStar/boardAstar/wasm/assembly/solver/winH
  local.tee $1
  global.get $src/views/idaStar/boardAstar/wasm/assembly/solver/height
  local.tee $0
  local.get $0
  local.get $1
  i32.gt_s
  select
  local.set $6
  loop $for-loop|0
   local.get $3
   global.get $src/views/idaStar/boardAstar/wasm/assembly/solver/height
   i32.lt_s
   if
    i32.const 0
    local.set $2
    loop $for-loop|1
     local.get $2
     global.get $src/views/idaStar/boardAstar/wasm/assembly/solver/width
     i32.lt_s
     if
      global.get $src/views/idaStar/boardAstar/wasm/assembly/solver/width
      local.get $2
      local.get $7
      i32.add
      i32.lt_s
      if (result i32)
       global.get $src/views/idaStar/boardAstar/wasm/assembly/solver/width
       local.get $7
       i32.sub
       local.tee $0
       i32.const 0
       local.get $0
       i32.const 0
       i32.ge_s
       select
      else
       local.get $2
      end
      local.set $1
      global.get $src/views/idaStar/boardAstar/wasm/assembly/solver/height
      local.get $3
      local.get $6
      i32.add
      i32.lt_s
      if (result i32)
       global.get $src/views/idaStar/boardAstar/wasm/assembly/solver/height
       local.get $6
       i32.sub
       local.tee $0
       i32.const 0
       local.get $0
       i32.const 0
       i32.ge_s
       select
      else
       local.get $3
      end
      local.set $0
      i32.const 0
      local.set $5
      i32.const 0
      local.set $8
      loop $for-loop|2
       local.get $8
       global.get $src/views/idaStar/boardAstar/wasm/assembly/solver/winCount
       i32.lt_s
       if
        block $for-break2
         global.get $~lib/memory/__stack_pointer
         global.get $src/views/idaStar/boardAstar/wasm/assembly/solver/winLefts
         local.tee $4
         i32.store
         local.get $4
         local.get $8
         call $~lib/staticarray/StaticArray<i32>#__get
         local.get $1
         i32.eq
         if (result i32)
          global.get $~lib/memory/__stack_pointer
          global.get $src/views/idaStar/boardAstar/wasm/assembly/solver/winTops
          local.tee $4
          i32.store
          local.get $4
          local.get $8
          call $~lib/staticarray/StaticArray<i32>#__get
          local.get $0
          i32.eq
         else
          i32.const 0
         end
         if (result i32)
          global.get $~lib/memory/__stack_pointer
          global.get $src/views/idaStar/boardAstar/wasm/assembly/solver/winWs
          local.tee $4
          i32.store
          local.get $4
          local.get $8
          call $~lib/staticarray/StaticArray<i32>#__get
          local.get $7
          i32.eq
         else
          i32.const 0
         end
         if (result i32)
          global.get $~lib/memory/__stack_pointer
          global.get $src/views/idaStar/boardAstar/wasm/assembly/solver/winHs
          local.tee $4
          i32.store
          local.get $4
          local.get $8
          call $~lib/staticarray/StaticArray<i32>#__get
          local.get $6
          i32.eq
         else
          i32.const 0
         end
         if
          i32.const 1
          local.set $5
          br $for-break2
         end
         local.get $8
         i32.const 1
         i32.add
         local.set $8
         br $for-loop|2
        end
       end
      end
      global.get $src/views/idaStar/boardAstar/wasm/assembly/solver/winCount
      i32.const 128
      i32.ge_s
      local.get $5
      i32.or
      i32.eqz
      if
       global.get $~lib/memory/__stack_pointer
       global.get $src/views/idaStar/boardAstar/wasm/assembly/solver/winLefts
       local.tee $4
       i32.store
       local.get $4
       global.get $src/views/idaStar/boardAstar/wasm/assembly/solver/winCount
       local.get $1
       call $~lib/staticarray/StaticArray<i32>#__set
       global.get $~lib/memory/__stack_pointer
       global.get $src/views/idaStar/boardAstar/wasm/assembly/solver/winTops
       local.tee $1
       i32.store
       local.get $1
       global.get $src/views/idaStar/boardAstar/wasm/assembly/solver/winCount
       local.get $0
       call $~lib/staticarray/StaticArray<i32>#__set
       global.get $~lib/memory/__stack_pointer
       global.get $src/views/idaStar/boardAstar/wasm/assembly/solver/winWs
       local.tee $0
       i32.store
       local.get $0
       global.get $src/views/idaStar/boardAstar/wasm/assembly/solver/winCount
       local.get $7
       call $~lib/staticarray/StaticArray<i32>#__set
       global.get $~lib/memory/__stack_pointer
       global.get $src/views/idaStar/boardAstar/wasm/assembly/solver/winHs
       local.tee $0
       i32.store
       local.get $0
       global.get $src/views/idaStar/boardAstar/wasm/assembly/solver/winCount
       local.get $6
       call $~lib/staticarray/StaticArray<i32>#__set
       global.get $src/views/idaStar/boardAstar/wasm/assembly/solver/winCount
       i32.const 1
       i32.add
       global.set $src/views/idaStar/boardAstar/wasm/assembly/solver/winCount
      end
      local.get $2
      local.get $7
      i32.add
      local.set $2
      br $for-loop|1
     end
    end
    local.get $3
    local.get $6
    i32.add
    local.set $3
    br $for-loop|0
   end
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
 (func $src/views/idaStar/boardAstar/wasm/assembly/solver/focusHas (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  block $folding-inner0 (result i32)
   loop $for-loop|0
    local.get $1
    global.get $src/views/idaStar/boardAstar/wasm/assembly/solver/focusLen
    i32.lt_s
    if
     global.get $~lib/memory/__stack_pointer
     global.get $src/views/idaStar/boardAstar/wasm/assembly/solver/focusArr
     local.tee $2
     i32.store
     i32.const 1
     local.get $2
     local.get $1
     call $~lib/staticarray/StaticArray<i32>#__get
     local.get $0
     i32.eq
     br_if $folding-inner0
     drop
     local.get $1
     i32.const 1
     i32.add
     local.set $1
     br $for-loop|0
    end
   end
   i32.const 0
  end
  local.set $0
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $src/views/idaStar/boardAstar/wasm/assembly/solver/collectWindowNums (param $0 i32) (param $1 i32) (param $2 i32) (param $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  (local $8 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  local.get $1
  local.set $4
  loop $for-loop|0
   local.get $4
   local.get $1
   local.get $3
   i32.add
   i32.lt_s
   if
    local.get $0
    local.set $5
    loop $for-loop|1
     local.get $5
     local.get $0
     local.get $2
     i32.add
     i32.lt_s
     if
      global.get $~lib/memory/__stack_pointer
      global.get $src/views/idaStar/boardAstar/wasm/assembly/solver/finish
      local.tee $6
      i32.store
      local.get $6
      local.get $4
      global.get $src/views/idaStar/boardAstar/wasm/assembly/solver/width
      i32.mul
      local.get $5
      i32.add
      call $~lib/staticarray/StaticArray<u8>#__get
      local.tee $6
      global.get $src/views/idaStar/boardAstar/wasm/assembly/solver/emptyNum
      i32.eq
      if (result i32)
       i32.const 1
      else
       local.get $6
       call $src/views/idaStar/boardAstar/wasm/assembly/solver/focusHas
      end
      local.set $7
      i32.const 1
      global.get $src/views/idaStar/boardAstar/wasm/assembly/solver/focusLen
      i32.const 64
      i32.ge_s
      local.get $7
      select
      i32.eqz
      if
       global.get $~lib/memory/__stack_pointer
       global.get $src/views/idaStar/boardAstar/wasm/assembly/solver/focusArr
       local.tee $7
       i32.store
       global.get $src/views/idaStar/boardAstar/wasm/assembly/solver/focusLen
       local.tee $8
       i32.const 1
       i32.add
       global.set $src/views/idaStar/boardAstar/wasm/assembly/solver/focusLen
       local.get $7
       local.get $8
       local.get $6
       call $~lib/staticarray/StaticArray<i32>#__set
      end
      local.get $5
      i32.const 1
      i32.add
      local.set $5
      br $for-loop|1
     end
    end
    local.get $4
    i32.const 1
    i32.add
    local.set $4
    br $for-loop|0
   end
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
 (func $src/views/idaStar/boardAstar/wasm/assembly/solver/isFocusDone (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store
  block $folding-inner0 (result i32)
   loop $for-loop|0
    local.get $1
    global.get $src/views/idaStar/boardAstar/wasm/assembly/solver/focusLen
    i32.lt_s
    if
     global.get $~lib/memory/__stack_pointer
     global.get $src/views/idaStar/boardAstar/wasm/assembly/solver/focusArr
     local.tee $2
     i32.store
     local.get $2
     local.get $1
     call $~lib/staticarray/StaticArray<i32>#__get
     local.tee $2
     global.get $src/views/idaStar/boardAstar/wasm/assembly/solver/emptyNum
     i32.ne
     if
      global.get $~lib/memory/__stack_pointer
      local.get $0
      i32.store
      global.get $~lib/memory/__stack_pointer
      global.get $src/views/idaStar/boardAstar/wasm/assembly/solver/finishPos
      local.tee $3
      i32.store offset=4
      i32.const 0
      local.get $0
      local.get $3
      local.get $2
      call $~lib/staticarray/StaticArray<i32>#__get
      call $~lib/staticarray/StaticArray<u8>#__get
      local.get $2
      i32.ne
      br_if $folding-inner0
      drop
     end
     local.get $1
     i32.const 1
     i32.add
     local.set $1
     br $for-loop|0
    end
   end
   i32.const 1
  end
  local.set $0
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $~lib/string/String.__concat (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.get $1
  i32.store offset=4
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store
  global.get $~lib/memory/__stack_pointer
  local.get $0
  local.tee $2
  i32.store
  local.get $0
  i32.const 20
  i32.sub
  i32.load offset=16
  i32.const -2
  i32.and
  local.set $3
  global.get $~lib/memory/__stack_pointer
  local.get $1
  i32.store
  block $__inlined_func$~lib/string/String#concat$89
   local.get $1
   i32.const 20
   i32.sub
   i32.load offset=16
   i32.const -2
   i32.and
   local.tee $4
   local.get $3
   i32.add
   local.tee $0
   i32.eqz
   if
    global.get $~lib/memory/__stack_pointer
    i32.const 8
    i32.add
    global.set $~lib/memory/__stack_pointer
    i32.const 1920
    local.set $0
    br $__inlined_func$~lib/string/String#concat$89
   end
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.const 2
   call $~lib/rt/itcms/__new
   local.tee $0
   i32.store offset=4
   local.get $0
   local.get $2
   local.get $3
   memory.copy
   local.get $0
   local.get $3
   i32.add
   local.get $1
   local.get $4
   memory.copy
   global.get $~lib/memory/__stack_pointer
   i32.const 8
   i32.add
   global.set $~lib/memory/__stack_pointer
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $~lib/string/String#charCodeAt (param $0 i32) (param $1 i32) (result i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $1
  local.get $0
  i32.const 20
  i32.sub
  i32.load offset=16
  i32.const 1
  i32.shr_u
  i32.ge_u
  if (result i32)
   i32.const -1
  else
   local.get $0
   local.get $1
   i32.const 1
   i32.shl
   i32.add
   i32.load16_u
  end
  local.set $0
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $src/views/idaStar/boardAstar/wasm/assembly/solver/setProgress (param $0 i32)
  (local $1 i32)
  (local $2 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store
  i32.const 0
  global.set $src/views/idaStar/boardAstar/wasm/assembly/solver/progressLen
  loop $for-loop|0
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store
   local.get $1
   i32.const 256
   i32.lt_s
   local.get $1
   local.get $0
   i32.const 20
   i32.sub
   i32.load offset=16
   i32.const 1
   i32.shr_u
   i32.lt_s
   i32.and
   if
    global.get $~lib/memory/__stack_pointer
    global.get $src/views/idaStar/boardAstar/wasm/assembly/solver/progressBuf
    local.tee $2
    i32.store
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store offset=4
    local.get $2
    local.get $1
    local.get $0
    local.get $1
    call $~lib/string/String#charCodeAt
    i32.const 255
    i32.and
    call $~lib/staticarray/StaticArray<u8>#__set
    global.get $src/views/idaStar/boardAstar/wasm/assembly/solver/progressLen
    i32.const 1
    i32.add
    global.set $src/views/idaStar/boardAstar/wasm/assembly/solver/progressLen
    local.get $1
    i32.const 1
    i32.add
    local.set $1
    br $for-loop|0
   end
  end
  global.get $src/views/idaStar/boardAstar/wasm/assembly/solver/progressBuf
  global.get $src/views/idaStar/boardAstar/wasm/assembly/solver/progressLen
  call $src/views/idaStar/boardAstar/wasm/assembly/solver/js_on_progress
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
 (func $"~lib/map/Map<~lib/string/String,src/views/idaStar/boardAstar/wasm/assembly/solver/Node>#constructor" (result i32)
  (local $0 i32)
  (local $1 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 12
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store offset=8
  global.get $~lib/memory/__stack_pointer
  i32.const 24
  i32.const 7
  call $~lib/rt/itcms/__new
  local.tee $0
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store offset=4
  i32.const 16
  call $~lib/arraybuffer/ArrayBuffer#constructor
  local.set $1
  global.get $~lib/memory/__stack_pointer
  local.get $1
  i32.store offset=8
  local.get $0
  local.get $1
  call $"~lib/map/Map<~lib/string/String,src/views/idaStar/boardAstar/wasm/assembly/solver/Node>#set:buckets"
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store offset=4
  local.get $0
  i32.const 3
  i32.store offset=4
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store offset=4
  i32.const 48
  call $~lib/arraybuffer/ArrayBuffer#constructor
  local.set $1
  global.get $~lib/memory/__stack_pointer
  local.get $1
  i32.store offset=8
  local.get $0
  local.get $1
  call $"~lib/map/Map<~lib/string/String,src/views/idaStar/boardAstar/wasm/assembly/solver/Node>#set:entries"
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store offset=4
  local.get $0
  i32.const 4
  i32.store offset=12
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store offset=4
  local.get $0
  i32.const 0
  i32.store offset=16
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store offset=4
  local.get $0
  i32.const 0
  i32.store offset=20
  global.get $~lib/memory/__stack_pointer
  i32.const 12
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $src/views/idaStar/boardAstar/wasm/assembly/solver/MinHeap#constructor (result i32)
  (local $0 i32)
  (local $1 i32)
  (local $2 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 12
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store offset=8
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.const 8
  call $~lib/rt/itcms/__new
  local.tee $0
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.set $1
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store offset=4
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  local.get $0
  i32.eqz
  if
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   i32.const 0
   call $~lib/rt/itcms/__new
   local.tee $0
   i32.store
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $1
  local.get $0
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store offset=4
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.set $2
  i32.const 0
  i32.const 1
  call $~lib/rt/itcms/__new
  local.tee $1
  i32.const 2176
  i32.const 0
  memory.copy
  local.get $2
  local.get $1
  i32.store
  i32.const 16
  i32.const 10
  call $~lib/rt/itcms/__new
  local.tee $2
  local.get $1
  i32.store
  local.get $2
  local.get $1
  i32.const 0
  call $~lib/rt/itcms/__link
  local.get $2
  local.get $1
  i32.store offset=4
  local.get $2
  i32.const 0
  i32.store offset=8
  local.get $2
  i32.const 0
  i32.store offset=12
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  local.get $2
  i32.store offset=8
  local.get $0
  local.get $2
  call $"~lib/map/Map<~lib/string/String,src/views/idaStar/boardAstar/wasm/assembly/solver/Node>#set:buckets"
  global.get $~lib/memory/__stack_pointer
  i32.const 12
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $src/views/idaStar/boardAstar/wasm/assembly/solver/boardKey (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 16
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store offset=8
  i32.const 1920
  local.set $1
  global.get $~lib/memory/__stack_pointer
  i32.const 1920
  i32.store
  loop $for-loop|0
   local.get $2
   global.get $src/views/idaStar/boardAstar/wasm/assembly/solver/n
   i32.lt_s
   if
    global.get $~lib/memory/__stack_pointer
    local.get $1
    i32.store offset=4
    global.get $~lib/memory/__stack_pointer
    local.set $4
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store offset=12
    local.get $0
    local.get $2
    call $~lib/staticarray/StaticArray<u8>#__get
    local.set $5
    global.get $~lib/memory/__stack_pointer
    i32.const 4
    i32.sub
    global.set $~lib/memory/__stack_pointer
    call $~stack_check
    global.get $~lib/memory/__stack_pointer
    i32.const 0
    i32.store
    global.get $~lib/memory/__stack_pointer
    i32.const 2
    i32.const 2
    call $~lib/rt/itcms/__new
    local.tee $3
    i32.store
    local.get $3
    local.get $5
    i32.store16
    global.get $~lib/memory/__stack_pointer
    i32.const 4
    i32.add
    global.set $~lib/memory/__stack_pointer
    global.get $~lib/memory/__stack_pointer
    local.get $3
    i32.store offset=8
    local.get $4
    local.get $1
    local.get $3
    call $~lib/string/String.__concat
    local.tee $1
    i32.store
    local.get $2
    i32.const 1
    i32.add
    local.set $2
    br $for-loop|0
   end
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 16
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $1
 )
 (func $src/views/idaStar/boardAstar/wasm/assembly/solver/findEmpty (param $0 i32) (result i32)
  (local $1 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  block $folding-inner0
   loop $for-loop|0
    local.get $1
    global.get $src/views/idaStar/boardAstar/wasm/assembly/solver/n
    i32.lt_s
    if
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store
     local.get $0
     local.get $1
     call $~lib/staticarray/StaticArray<u8>#__get
     global.get $src/views/idaStar/boardAstar/wasm/assembly/solver/emptyNum
     i32.eq
     br_if $folding-inner0
     local.get $1
     i32.const 1
     i32.add
     local.set $1
     br $for-loop|0
    end
   end
   global.get $src/views/idaStar/boardAstar/wasm/assembly/solver/n
   i32.const 1
   i32.sub
   local.set $1
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $1
 )
 (func $src/views/idaStar/boardAstar/wasm/assembly/solver/manhattanTo (param $0 i32) (param $1 i32) (param $2 i32) (result f64)
  (local $3 i32)
  (local $4 i32)
  (local $5 f64)
  (local $6 f64)
  (local $7 i32)
  (local $8 i32)
  (local $9 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  loop $for-loop|0
   local.get $3
   global.get $src/views/idaStar/boardAstar/wasm/assembly/solver/n
   i32.lt_s
   if
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store
    local.get $0
    local.get $3
    call $~lib/staticarray/StaticArray<u8>#__get
    local.tee $8
    global.get $src/views/idaStar/boardAstar/wasm/assembly/solver/emptyNum
    i32.ne
    if
     global.get $~lib/memory/__stack_pointer
     local.get $1
     i32.store
     local.get $1
     local.get $8
     call $~lib/staticarray/StaticArray<i32>#__get
     local.set $9
     i32.const 0
     local.get $3
     global.get $src/views/idaStar/boardAstar/wasm/assembly/solver/width
     local.tee $7
     i32.div_s
     local.get $9
     local.get $7
     i32.div_s
     i32.sub
     local.tee $4
     i32.sub
     local.get $4
     local.get $4
     i32.const 0
     i32.lt_s
     select
     i32.const 0
     local.get $3
     local.get $7
     i32.rem_s
     local.get $9
     local.get $7
     i32.rem_s
     i32.sub
     local.tee $4
     i32.sub
     local.get $4
     local.get $4
     i32.const 0
     i32.lt_s
     select
     i32.add
     f64.convert_i32_s
     local.set $5
     local.get $2
     if (result i32)
      local.get $8
      call $src/views/idaStar/boardAstar/wasm/assembly/solver/focusHas
     else
      i32.const 0
     end
     local.set $4
     local.get $6
     local.get $5
     global.get $src/views/idaStar/boardAstar/wasm/assembly/solver/winWeight
     f64.mul
     local.get $5
     local.get $4
     select
     f64.add
     local.set $6
    end
    local.get $3
    i32.const 1
    i32.add
    local.set $3
    br $for-loop|0
   end
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $6
 )
 (func $src/views/idaStar/boardAstar/wasm/assembly/solver/getAdjacent (param $0 i32) (result f64)
  (local $1 f64)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 12
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store offset=8
  global.get $~lib/memory/__stack_pointer
  i32.const 64
  call $~lib/staticarray/StaticArray<i32>#constructor
  local.tee $3
  i32.store
  loop $for-loop|0
   local.get $2
   global.get $src/views/idaStar/boardAstar/wasm/assembly/solver/n
   i32.lt_s
   if
    global.get $~lib/memory/__stack_pointer
    local.get $3
    i32.store offset=4
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store offset=8
    local.get $3
    local.get $0
    local.get $2
    call $~lib/staticarray/StaticArray<u8>#__get
    local.get $2
    call $~lib/staticarray/StaticArray<i32>#__set
    local.get $2
    i32.const 1
    i32.add
    local.set $2
    br $for-loop|0
   end
  end
  i32.const 0
  local.set $0
  loop $for-loop|1
   local.get $0
   global.get $src/views/idaStar/boardAstar/wasm/assembly/solver/n
   i32.lt_s
   if
    global.get $~lib/memory/__stack_pointer
    global.get $src/views/idaStar/boardAstar/wasm/assembly/solver/finish
    local.tee $2
    i32.store offset=4
    local.get $2
    local.get $0
    call $~lib/staticarray/StaticArray<u8>#__get
    local.tee $4
    global.get $src/views/idaStar/boardAstar/wasm/assembly/solver/emptyNum
    i32.ne
    if
     global.get $src/views/idaStar/boardAstar/wasm/assembly/solver/width
     i32.const 1
     i32.sub
     local.get $0
     global.get $src/views/idaStar/boardAstar/wasm/assembly/solver/width
     i32.rem_s
     i32.ne
     if
      global.get $~lib/memory/__stack_pointer
      global.get $src/views/idaStar/boardAstar/wasm/assembly/solver/finish
      local.tee $2
      i32.store offset=4
      local.get $2
      local.get $0
      i32.const 1
      i32.add
      call $~lib/staticarray/StaticArray<u8>#__get
      local.tee $2
      global.get $src/views/idaStar/boardAstar/wasm/assembly/solver/emptyNum
      i32.ne
      if
       global.get $~lib/memory/__stack_pointer
       local.get $3
       i32.store offset=4
       local.get $3
       local.get $4
       call $~lib/staticarray/StaticArray<i32>#__get
       local.set $5
       global.get $~lib/memory/__stack_pointer
       local.get $3
       i32.store offset=4
       local.get $3
       local.get $2
       call $~lib/staticarray/StaticArray<i32>#__get
       local.set $6
       local.get $1
       i32.const 0
       local.get $5
       global.get $src/views/idaStar/boardAstar/wasm/assembly/solver/width
       local.tee $7
       i32.div_s
       local.get $6
       local.get $7
       i32.div_s
       i32.sub
       local.tee $2
       i32.sub
       local.get $2
       local.get $2
       i32.const 0
       i32.lt_s
       select
       i32.const 0
       local.get $5
       local.get $7
       i32.rem_s
       local.get $6
       local.get $7
       i32.rem_s
       i32.sub
       local.tee $2
       i32.sub
       local.get $2
       local.get $2
       i32.const 0
       i32.lt_s
       select
       i32.add
       i32.const 1
       i32.sub
       f64.convert_i32_s
       f64.add
       local.set $1
      end
     end
     global.get $src/views/idaStar/boardAstar/wasm/assembly/solver/height
     i32.const 1
     i32.sub
     local.get $0
     global.get $src/views/idaStar/boardAstar/wasm/assembly/solver/width
     i32.div_s
     i32.ne
     if
      global.get $~lib/memory/__stack_pointer
      global.get $src/views/idaStar/boardAstar/wasm/assembly/solver/finish
      local.tee $2
      i32.store offset=4
      local.get $2
      local.get $0
      global.get $src/views/idaStar/boardAstar/wasm/assembly/solver/width
      i32.add
      call $~lib/staticarray/StaticArray<u8>#__get
      local.tee $2
      global.get $src/views/idaStar/boardAstar/wasm/assembly/solver/emptyNum
      i32.ne
      if (result f64)
       global.get $~lib/memory/__stack_pointer
       local.get $3
       i32.store offset=4
       local.get $3
       local.get $4
       call $~lib/staticarray/StaticArray<i32>#__get
       local.set $4
       global.get $~lib/memory/__stack_pointer
       local.get $3
       i32.store offset=4
       local.get $3
       local.get $2
       call $~lib/staticarray/StaticArray<i32>#__get
       local.set $2
       local.get $1
       i32.const 0
       local.get $4
       global.get $src/views/idaStar/boardAstar/wasm/assembly/solver/width
       local.tee $5
       i32.div_s
       local.get $2
       local.get $5
       i32.div_s
       i32.sub
       local.tee $6
       i32.sub
       local.get $6
       local.get $6
       i32.const 0
       i32.lt_s
       select
       i32.const 0
       local.get $4
       local.get $5
       i32.rem_s
       local.get $2
       local.get $5
       i32.rem_s
       i32.sub
       local.tee $2
       i32.sub
       local.get $2
       local.get $2
       i32.const 0
       i32.lt_s
       select
       i32.add
       i32.const 1
       i32.sub
       f64.convert_i32_s
       f64.add
      else
       local.get $1
      end
      local.set $1
     end
    end
    local.get $0
    i32.const 1
    i32.add
    local.set $0
    br $for-loop|1
   end
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 12
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $1
 )
 (func $src/views/idaStar/boardAstar/wasm/assembly/solver/calcWinValue (param $0 i32) (param $1 i32) (result f64)
  (local $2 f64)
  (local $3 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store
  global.get $~lib/memory/__stack_pointer
  local.get $1
  i32.store
  global.get $~lib/memory/__stack_pointer
  global.get $src/views/idaStar/boardAstar/wasm/assembly/solver/finishPos
  local.tee $3
  i32.store offset=4
  local.get $0
  f64.convert_i32_s
  local.get $1
  local.get $3
  i32.const 1
  call $src/views/idaStar/boardAstar/wasm/assembly/solver/manhattanTo
  f64.add
  local.set $2
  global.get $~lib/memory/__stack_pointer
  local.get $1
  i32.store
  local.get $2
  local.get $1
  call $src/views/idaStar/boardAstar/wasm/assembly/solver/getAdjacent
  f64.const 0.5
  f64.mul
  f64.add
  local.set $2
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $2
 )
 (func $src/views/idaStar/boardAstar/wasm/assembly/solver/Node#constructor (param $0 i32) (param $1 i32) (param $2 i32) (param $3 i32) (param $4 f64) (result i32)
  (local $5 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 12
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store offset=8
  global.get $~lib/memory/__stack_pointer
  i32.const 24
  i32.const 6
  call $~lib/rt/itcms/__new
  local.tee $5
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.get $5
  i32.store offset=4
  local.get $5
  i32.const 0
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.get $5
  i32.store offset=4
  local.get $5
  i32.const 0
  i32.store offset=4
  global.get $~lib/memory/__stack_pointer
  local.get $5
  i32.store offset=4
  local.get $5
  i32.const 0
  i32.store offset=8
  global.get $~lib/memory/__stack_pointer
  local.get $5
  i32.store offset=4
  local.get $5
  i32.const 0
  call $src/views/idaStar/boardAstar/wasm/assembly/solver/Node#set:parentKey
  global.get $~lib/memory/__stack_pointer
  local.get $5
  i32.store offset=4
  local.get $5
  f64.const 0
  f64.store offset=16
  global.get $~lib/memory/__stack_pointer
  local.get $5
  i32.store offset=4
  local.get $5
  local.get $0
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.get $5
  i32.store offset=4
  local.get $5
  local.get $1
  i32.store offset=4
  global.get $~lib/memory/__stack_pointer
  local.get $5
  i32.store offset=4
  local.get $5
  local.get $2
  i32.store offset=8
  global.get $~lib/memory/__stack_pointer
  local.get $5
  i32.store offset=4
  global.get $~lib/memory/__stack_pointer
  local.get $3
  i32.store offset=8
  local.get $5
  local.get $3
  call $src/views/idaStar/boardAstar/wasm/assembly/solver/Node#set:parentKey
  global.get $~lib/memory/__stack_pointer
  local.get $5
  i32.store offset=4
  local.get $5
  local.get $4
  f64.store offset=16
  global.get $~lib/memory/__stack_pointer
  i32.const 12
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $5
 )
 (func $~lib/util/hash/HASH<~lib/string/String> (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store
  block $~lib/util/hash/hashStr|inlined.0 (result i32)
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store
   i32.const 0
   local.get $0
   i32.eqz
   br_if $~lib/util/hash/hashStr|inlined.0
   drop
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store offset=4
   local.get $0
   local.tee $1
   i32.const 20
   i32.sub
   i32.load offset=16
   i32.const -2
   i32.and
   local.tee $3
   i32.const 16
   i32.ge_u
   if (result i32)
    i32.const 606290984
    local.set $2
    i32.const -2048144777
    local.set $4
    i32.const 1640531535
    local.set $5
    local.get $1
    local.get $3
    i32.add
    i32.const 16
    i32.sub
    local.set $7
    loop $while-continue|0
     local.get $1
     local.get $7
     i32.le_u
     if
      local.get $2
      local.get $1
      i32.load
      i32.const -2048144777
      i32.mul
      i32.add
      i32.const 13
      i32.rotl
      i32.const -1640531535
      i32.mul
      local.set $2
      local.get $4
      local.get $1
      i32.load offset=4
      i32.const -2048144777
      i32.mul
      i32.add
      i32.const 13
      i32.rotl
      i32.const -1640531535
      i32.mul
      local.set $4
      local.get $6
      local.get $1
      i32.load offset=8
      i32.const -2048144777
      i32.mul
      i32.add
      i32.const 13
      i32.rotl
      i32.const -1640531535
      i32.mul
      local.set $6
      local.get $5
      local.get $1
      i32.load offset=12
      i32.const -2048144777
      i32.mul
      i32.add
      i32.const 13
      i32.rotl
      i32.const -1640531535
      i32.mul
      local.set $5
      local.get $1
      i32.const 16
      i32.add
      local.set $1
      br $while-continue|0
     end
    end
    local.get $3
    local.get $2
    i32.const 1
    i32.rotl
    local.get $4
    i32.const 7
    i32.rotl
    i32.add
    local.get $6
    i32.const 12
    i32.rotl
    i32.add
    local.get $5
    i32.const 18
    i32.rotl
    i32.add
    i32.add
   else
    local.get $3
    i32.const 374761393
    i32.add
   end
   local.set $2
   local.get $0
   local.get $3
   i32.add
   i32.const 4
   i32.sub
   local.set $4
   loop $while-continue|1
    local.get $1
    local.get $4
    i32.le_u
    if
     local.get $2
     local.get $1
     i32.load
     i32.const -1028477379
     i32.mul
     i32.add
     i32.const 17
     i32.rotl
     i32.const 668265263
     i32.mul
     local.set $2
     local.get $1
     i32.const 4
     i32.add
     local.set $1
     br $while-continue|1
    end
   end
   local.get $0
   local.get $3
   i32.add
   local.set $0
   loop $while-continue|2
    local.get $0
    local.get $1
    i32.gt_u
    if
     local.get $2
     local.get $1
     i32.load8_u
     i32.const 374761393
     i32.mul
     i32.add
     i32.const 11
     i32.rotl
     i32.const -1640531535
     i32.mul
     local.set $2
     local.get $1
     i32.const 1
     i32.add
     local.set $1
     br $while-continue|2
    end
   end
   local.get $2
   local.get $2
   i32.const 15
   i32.shr_u
   i32.xor
   i32.const -2048144777
   i32.mul
   local.tee $0
   i32.const 13
   i32.shr_u
   local.get $0
   i32.xor
   i32.const -1028477379
   i32.mul
   local.tee $0
   i32.const 16
   i32.shr_u
   local.get $0
   i32.xor
  end
  local.set $0
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $~lib/string/String.__eq (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store
  block $folding-inner0
   local.get $0
   local.get $1
   i32.eq
   if
    i32.const 1
    local.set $2
    br $folding-inner0
   end
   local.get $1
   i32.eqz
   local.get $0
   i32.eqz
   i32.or
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store
   local.get $0
   i32.const 20
   i32.sub
   i32.load offset=16
   i32.const 1
   i32.shr_u
   local.set $2
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store
   local.get $2
   local.get $1
   i32.const 20
   i32.sub
   i32.load offset=16
   i32.const 1
   i32.shr_u
   i32.ne
   if
    i32.const 0
    local.set $2
    br $folding-inner0
   end
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store offset=4
   block $__inlined_func$~lib/util/string/compareImpl$33 (result i32)
    local.get $0
    i32.const 7
    i32.and
    local.get $1
    i32.const 7
    i32.and
    i32.or
    i32.eqz
    local.get $2
    i32.const 4
    i32.ge_u
    i32.and
    if
     loop $do-loop|0
      local.get $0
      i64.load
      local.get $1
      i64.load
      i64.eq
      if
       local.get $0
       i32.const 8
       i32.add
       local.set $0
       local.get $1
       i32.const 8
       i32.add
       local.set $1
       local.get $2
       i32.const 4
       i32.sub
       local.tee $2
       i32.const 4
       i32.ge_u
       br_if $do-loop|0
      end
     end
    end
    loop $while-continue|1
     local.get $2
     local.tee $3
     i32.const 1
     i32.sub
     local.set $2
     local.get $3
     if
      local.get $0
      i32.load16_u
      local.tee $4
      local.get $1
      i32.load16_u
      local.tee $3
      i32.ne
      if
       local.get $4
       local.get $3
       i32.sub
       br $__inlined_func$~lib/util/string/compareImpl$33
      end
      local.get $0
      i32.const 2
      i32.add
      local.set $0
      local.get $1
      i32.const 2
      i32.add
      local.set $1
      br $while-continue|1
     end
    end
    i32.const 0
   end
   i32.eqz
   local.set $2
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $2
 )
 (func $"~lib/map/Map<~lib/string/String,src/views/idaStar/boardAstar/wasm/assembly/solver/Node>#find" (param $0 i32) (param $1 i32) (param $2 i32) (result i32)
  (local $3 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $0
  i32.load
  local.set $3
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $3
  local.get $2
  local.get $0
  i32.load offset=4
  i32.and
  i32.const 2
  i32.shl
  i32.add
  i32.load
  local.set $0
  block $folding-inner0
   loop $while-continue|0
    local.get $0
    if
     local.get $0
     i32.load offset=8
     local.tee $2
     i32.const 1
     i32.and
     if (result i32)
      i32.const 0
     else
      global.get $~lib/memory/__stack_pointer
      local.get $0
      i32.load
      local.tee $3
      i32.store
      global.get $~lib/memory/__stack_pointer
      local.get $1
      i32.store offset=4
      local.get $3
      local.get $1
      call $~lib/string/String.__eq
     end
     br_if $folding-inner0
     local.get $2
     i32.const -2
     i32.and
     local.set $0
     br $while-continue|0
    end
   end
   i32.const 0
   local.set $0
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $"~lib/map/Map<~lib/string/String,src/views/idaStar/boardAstar/wasm/assembly/solver/Node>#rehash" (param $0 i32) (param $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  (local $8 i32)
  (local $9 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 20
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.const 20
  memory.fill
  global.get $~lib/memory/__stack_pointer
  local.get $1
  i32.const 1
  i32.add
  local.tee $2
  i32.const 2
  i32.shl
  call $~lib/arraybuffer/ArrayBuffer#constructor
  local.tee $7
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.get $2
  i32.const 3
  i32.shl
  i32.const 3
  i32.div_s
  local.tee $6
  i32.const 12
  i32.mul
  call $~lib/arraybuffer/ArrayBuffer#constructor
  local.tee $3
  i32.store offset=4
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store offset=8
  local.get $0
  i32.load offset=8
  local.set $8
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store offset=8
  local.get $8
  local.get $0
  i32.load offset=16
  i32.const 12
  i32.mul
  i32.add
  local.set $5
  local.get $3
  local.set $2
  loop $while-continue|0
   local.get $5
   local.get $8
   i32.ne
   if
    local.get $8
    i32.load offset=8
    i32.const 1
    i32.and
    i32.eqz
    if
     global.get $~lib/memory/__stack_pointer
     local.get $8
     i32.load
     local.tee $9
     i32.store offset=12
     global.get $~lib/memory/__stack_pointer
     local.get $9
     i32.store offset=8
     local.get $2
     local.get $9
     i32.store
     global.get $~lib/memory/__stack_pointer
     local.get $8
     i32.load offset=4
     local.tee $4
     i32.store offset=8
     local.get $2
     local.get $4
     i32.store offset=4
     global.get $~lib/memory/__stack_pointer
     local.get $9
     i32.store offset=8
     local.get $2
     local.get $7
     local.get $9
     call $~lib/util/hash/HASH<~lib/string/String>
     local.get $1
     i32.and
     i32.const 2
     i32.shl
     i32.add
     local.tee $4
     i32.load
     i32.store offset=8
     local.get $4
     local.get $2
     i32.store
     local.get $2
     i32.const 12
     i32.add
     local.set $2
    end
    local.get $8
    i32.const 12
    i32.add
    local.set $8
    br $while-continue|0
   end
  end
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store offset=8
  global.get $~lib/memory/__stack_pointer
  local.get $7
  i32.store offset=16
  local.get $0
  local.get $7
  call $"~lib/map/Map<~lib/string/String,src/views/idaStar/boardAstar/wasm/assembly/solver/Node>#set:buckets"
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store offset=8
  local.get $0
  local.get $1
  i32.store offset=4
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store offset=8
  global.get $~lib/memory/__stack_pointer
  local.get $3
  i32.store offset=16
  local.get $0
  local.get $3
  call $"~lib/map/Map<~lib/string/String,src/views/idaStar/boardAstar/wasm/assembly/solver/Node>#set:entries"
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store offset=8
  local.get $0
  local.get $6
  i32.store offset=12
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store offset=8
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store offset=16
  local.get $0
  local.get $0
  i32.load offset=20
  i32.store offset=16
  global.get $~lib/memory/__stack_pointer
  i32.const 20
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
 (func $"~lib/map/Map<~lib/string/String,src/views/idaStar/boardAstar/wasm/assembly/solver/Node>#set" (param $0 i32) (param $1 i32) (param $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 12
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store offset=8
  global.get $~lib/memory/__stack_pointer
  local.get $1
  i32.store
  local.get $1
  call $~lib/util/hash/HASH<~lib/string/String>
  local.set $3
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.get $1
  i32.store offset=4
  local.get $0
  local.get $1
  local.get $3
  call $"~lib/map/Map<~lib/string/String,src/views/idaStar/boardAstar/wasm/assembly/solver/Node>#find"
  local.tee $4
  if
   global.get $~lib/memory/__stack_pointer
   local.get $2
   i32.store
   local.get $4
   local.get $2
   i32.store offset=4
   local.get $0
   local.get $2
   i32.const 1
   call $~lib/rt/itcms/__link
  else
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store
   local.get $0
   i32.load offset=16
   local.set $4
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store
   local.get $4
   local.get $0
   i32.load offset=12
   i32.eq
   if
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store offset=4
    local.get $0
    i32.load offset=20
    local.set $4
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store offset=4
    local.get $0
    local.get $4
    local.get $0
    i32.load offset=12
    i32.const 3
    i32.mul
    i32.const 4
    i32.div_s
    i32.lt_s
    if (result i32)
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=4
     local.get $0
     i32.load offset=4
    else
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=4
     local.get $0
     i32.load offset=4
     i32.const 1
     i32.shl
     i32.const 1
     i32.or
    end
    call $"~lib/map/Map<~lib/string/String,src/views/idaStar/boardAstar/wasm/assembly/solver/Node>#rehash"
   end
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.load offset=8
   local.tee $4
   i32.store offset=8
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store offset=4
   local.get $0
   local.get $0
   i32.load offset=16
   local.tee $5
   i32.const 1
   i32.add
   i32.store offset=16
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store
   local.get $4
   local.get $5
   i32.const 12
   i32.mul
   i32.add
   local.tee $4
   local.get $1
   i32.store
   local.get $0
   local.get $1
   i32.const 1
   call $~lib/rt/itcms/__link
   global.get $~lib/memory/__stack_pointer
   local.get $2
   i32.store
   local.get $4
   local.get $2
   i32.store offset=4
   local.get $0
   local.get $2
   i32.const 1
   call $~lib/rt/itcms/__link
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store offset=4
   local.get $0
   local.get $0
   i32.load offset=20
   i32.const 1
   i32.add
   i32.store offset=20
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store
   local.get $0
   i32.load
   local.set $1
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store
   local.get $4
   local.get $1
   local.get $3
   local.get $0
   i32.load offset=4
   i32.and
   i32.const 2
   i32.shl
   i32.add
   local.tee $0
   i32.load
   i32.store offset=8
   local.get $0
   local.get $4
   i32.store
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 12
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
 (func $src/views/idaStar/boardAstar/wasm/assembly/solver/HeapItem#constructor (param $0 i32) (param $1 f64) (param $2 i32) (result i32)
  (local $3 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 12
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store offset=8
  global.get $~lib/memory/__stack_pointer
  i32.const 20
  i32.const 9
  call $~lib/rt/itcms/__new
  local.tee $3
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.get $3
  i32.store offset=4
  local.get $3
  i32.const 0
  call $"~lib/map/Map<~lib/string/String,src/views/idaStar/boardAstar/wasm/assembly/solver/Node>#set:buckets"
  global.get $~lib/memory/__stack_pointer
  local.get $3
  i32.store offset=4
  local.get $3
  f64.const 0
  f64.store offset=8
  global.get $~lib/memory/__stack_pointer
  local.get $3
  i32.store offset=4
  local.get $3
  i32.const 0
  i32.store offset=16
  global.get $~lib/memory/__stack_pointer
  local.get $3
  i32.store offset=4
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store offset=8
  local.get $3
  local.get $0
  call $"~lib/map/Map<~lib/string/String,src/views/idaStar/boardAstar/wasm/assembly/solver/Node>#set:buckets"
  global.get $~lib/memory/__stack_pointer
  local.get $3
  i32.store offset=4
  local.get $3
  local.get $1
  f64.store offset=8
  global.get $~lib/memory/__stack_pointer
  local.get $3
  i32.store offset=4
  local.get $3
  local.get $2
  i32.store offset=16
  global.get $~lib/memory/__stack_pointer
  i32.const 12
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $3
 )
 (func $~lib/array/ensureCapacity (param $0 i32) (param $1 i32) (param $2 i32)
  (local $3 i32)
  (local $4 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $1
  local.get $0
  i32.load offset=8
  local.tee $4
  i32.const 2
  i32.shr_u
  i32.gt_u
  if
   local.get $1
   i32.const 268435455
   i32.gt_u
   if
    i32.const 1056
    i32.const 2208
    i32.const 19
    i32.const 48
    call $~lib/builtins/abort
    unreachable
   end
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store
   local.get $0
   i32.load
   local.set $3
   i32.const 8
   local.get $1
   local.get $1
   i32.const 8
   i32.le_u
   select
   i32.const 2
   i32.shl
   local.set $1
   local.get $2
   if
    i32.const 1073741820
    local.get $4
    i32.const 1
    i32.shl
    local.tee $2
    local.get $2
    i32.const 1073741820
    i32.ge_u
    select
    local.tee $2
    local.get $1
    local.get $1
    local.get $2
    i32.lt_u
    select
    local.set $1
   end
   block $__inlined_func$~lib/rt/itcms/__renew$316
    local.get $3
    i32.const 20
    i32.sub
    local.tee $4
    i32.load
    i32.const -4
    i32.and
    i32.const 16
    i32.sub
    local.get $1
    i32.ge_u
    if
     local.get $4
     local.get $1
     i32.store offset=16
     local.get $3
     local.set $2
     br $__inlined_func$~lib/rt/itcms/__renew$316
    end
    local.get $1
    local.get $4
    i32.load offset=12
    call $~lib/rt/itcms/__new
    local.tee $2
    local.get $3
    local.get $1
    local.get $4
    i32.load offset=16
    local.tee $4
    local.get $1
    local.get $4
    i32.lt_u
    select
    memory.copy
   end
   local.get $2
   local.get $3
   i32.ne
   if
    local.get $0
    local.get $2
    i32.store
    local.get $0
    local.get $2
    i32.store offset=4
    local.get $0
    local.get $2
    i32.const 0
    call $~lib/rt/itcms/__link
   end
   local.get $0
   local.get $1
   i32.store offset=8
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
 (func $~lib/array/Array<src/views/idaStar/boardAstar/wasm/assembly/solver/HeapItem>#get:length (param $0 i32) (result i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $0
  i32.load offset=12
  local.set $0
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $~lib/array/Array<src/views/idaStar/boardAstar/wasm/assembly/solver/HeapItem>#__get (param $0 i32) (param $1 i32) (result i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $1
  local.get $0
  i32.load offset=12
  i32.ge_u
  if
   i32.const 1360
   i32.const 2208
   i32.const 114
   i32.const 42
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.load offset=4
  local.get $1
  i32.const 2
  i32.shl
  i32.add
  i32.load
  local.tee $0
  i32.store offset=4
  local.get $0
  i32.eqz
  if
   i32.const 2256
   i32.const 2208
   i32.const 118
   i32.const 40
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $src/views/idaStar/boardAstar/wasm/assembly/solver/MinHeap#less (param $0 i32) (param $1 i32) (result i32)
  (local $2 f64)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  block $folding-inner0 (result i32)
   local.get $0
   f64.load offset=8
   local.set $2
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store
   local.get $2
   local.get $1
   f64.load offset=8
   f64.ne
   if
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store
    local.get $0
    f64.load offset=8
    local.set $2
    global.get $~lib/memory/__stack_pointer
    local.get $1
    i32.store
    local.get $2
    local.get $1
    f64.load offset=8
    f64.lt
    br $folding-inner0
   end
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store
   local.get $0
   i32.load offset=16
   local.set $0
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store
   local.get $0
   local.get $1
   i32.load offset=16
   i32.gt_s
  end
  local.set $0
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $~lib/array/Array<src/views/idaStar/boardAstar/wasm/assembly/solver/HeapItem>#__set (param $0 i32) (param $1 i32) (param $2 i32)
  (local $3 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $1
  local.get $0
  i32.load offset=12
  i32.ge_u
  if
   local.get $1
   i32.const 0
   i32.lt_s
   if
    i32.const 1360
    i32.const 2208
    i32.const 130
    i32.const 22
    call $~lib/builtins/abort
    unreachable
   end
   local.get $0
   local.get $1
   i32.const 1
   i32.add
   local.tee $3
   i32.const 1
   call $~lib/array/ensureCapacity
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store
   local.get $0
   local.get $3
   i32.store offset=12
  end
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $0
  i32.load offset=4
  local.get $1
  i32.const 2
  i32.shl
  i32.add
  local.get $2
  i32.store
  local.get $0
  local.get $2
  i32.const 1
  call $~lib/rt/itcms/__link
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
 (func $src/views/idaStar/boardAstar/wasm/assembly/solver/MinHeap#siftUp (param $0 i32) (param $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 24
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.const 24
  memory.fill
  loop $while-continue|0
   local.get $1
   i32.const 0
   i32.gt_s
   if
    block $while-break|0
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=16
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.load
     local.tee $2
     i32.store offset=12
     local.get $2
     local.get $1
     call $~lib/array/Array<src/views/idaStar/boardAstar/wasm/assembly/solver/HeapItem>#__get
     local.set $3
     global.get $~lib/memory/__stack_pointer
     local.get $3
     i32.store offset=4
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=16
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.load
     local.tee $2
     i32.store offset=12
     local.get $2
     local.get $1
     i32.const 1
     i32.sub
     i32.const 1
     i32.shr_s
     local.tee $2
     call $~lib/array/Array<src/views/idaStar/boardAstar/wasm/assembly/solver/HeapItem>#__get
     local.set $4
     global.get $~lib/memory/__stack_pointer
     local.get $4
     i32.store offset=8
     local.get $3
     local.get $4
     call $src/views/idaStar/boardAstar/wasm/assembly/solver/MinHeap#less
     i32.eqz
     br_if $while-break|0
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=4
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.load
     local.tee $3
     i32.store
     global.get $~lib/memory/__stack_pointer
     local.get $3
     local.get $1
     call $~lib/array/Array<src/views/idaStar/boardAstar/wasm/assembly/solver/HeapItem>#__get
     local.tee $3
     i32.store offset=20
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=8
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.load
     local.tee $4
     i32.store
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=12
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.load
     local.tee $5
     i32.store offset=8
     local.get $5
     local.get $2
     call $~lib/array/Array<src/views/idaStar/boardAstar/wasm/assembly/solver/HeapItem>#__get
     local.set $5
     global.get $~lib/memory/__stack_pointer
     local.get $5
     i32.store offset=4
     local.get $4
     local.get $1
     local.get $5
     call $~lib/array/Array<src/views/idaStar/boardAstar/wasm/assembly/solver/HeapItem>#__set
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=8
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.load
     local.tee $1
     i32.store
     global.get $~lib/memory/__stack_pointer
     local.get $3
     i32.store offset=4
     local.get $1
     local.get $2
     local.get $3
     call $~lib/array/Array<src/views/idaStar/boardAstar/wasm/assembly/solver/HeapItem>#__set
     local.get $2
     local.set $1
     br $while-continue|0
    end
   end
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 24
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
 (func $src/views/idaStar/boardAstar/wasm/assembly/solver/MinHeap#push (param $0 i32) (param $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 12
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store offset=8
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store offset=8
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.load
  local.tee $2
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.get $1
  i32.store offset=4
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.get $2
  i32.store
  local.get $2
  local.get $2
  i32.load offset=12
  local.tee $3
  i32.const 1
  i32.add
  local.tee $4
  i32.const 1
  call $~lib/array/ensureCapacity
  global.get $~lib/memory/__stack_pointer
  local.get $2
  i32.store
  local.get $2
  i32.load offset=4
  local.get $3
  i32.const 2
  i32.shl
  i32.add
  local.get $1
  i32.store
  local.get $2
  local.get $1
  i32.const 1
  call $~lib/rt/itcms/__link
  global.get $~lib/memory/__stack_pointer
  local.get $2
  i32.store
  local.get $2
  local.get $4
  i32.store offset=12
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store offset=8
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.load
  local.tee $1
  i32.store offset=4
  local.get $0
  local.get $1
  call $~lib/array/Array<src/views/idaStar/boardAstar/wasm/assembly/solver/HeapItem>#get:length
  i32.const 1
  i32.sub
  call $src/views/idaStar/boardAstar/wasm/assembly/solver/MinHeap#siftUp
  global.get $~lib/memory/__stack_pointer
  i32.const 12
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
 (func $src/views/idaStar/boardAstar/wasm/assembly/solver/MinHeap#get:size (param $0 i32) (result i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store offset=4
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.load
  local.tee $0
  i32.store
  local.get $0
  call $~lib/array/Array<src/views/idaStar/boardAstar/wasm/assembly/solver/HeapItem>#get:length
  local.set $0
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $src/views/idaStar/boardAstar/wasm/assembly/solver/MinHeap#siftDown (param $0 i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 24
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.const 24
  memory.fill
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store offset=4
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.load
  local.tee $1
  i32.store
  local.get $1
  call $~lib/array/Array<src/views/idaStar/boardAstar/wasm/assembly/solver/HeapItem>#get:length
  local.set $6
  loop $while-continue|0
   local.get $2
   local.get $2
   local.tee $1
   i32.const 1
   i32.shl
   i32.const 1
   i32.add
   local.tee $4
   i32.const 1
   i32.add
   local.tee $5
   local.get $4
   local.get $2
   local.get $4
   local.get $6
   i32.lt_s
   if (result i32)
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store offset=16
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.load
    local.tee $3
    i32.store offset=12
    local.get $3
    local.get $4
    call $~lib/array/Array<src/views/idaStar/boardAstar/wasm/assembly/solver/HeapItem>#__get
    local.set $4
    global.get $~lib/memory/__stack_pointer
    local.get $4
    i32.store offset=4
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store offset=16
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.load
    local.tee $3
    i32.store offset=12
    local.get $3
    local.get $2
    call $~lib/array/Array<src/views/idaStar/boardAstar/wasm/assembly/solver/HeapItem>#__get
    local.set $2
    global.get $~lib/memory/__stack_pointer
    local.get $2
    i32.store offset=8
    local.get $4
    local.get $2
    call $src/views/idaStar/boardAstar/wasm/assembly/solver/MinHeap#less
   else
    i32.const 0
   end
   select
   local.tee $4
   local.get $5
   local.get $6
   i32.lt_s
   if (result i32)
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store offset=16
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.load
    local.tee $2
    i32.store offset=12
    local.get $2
    local.get $5
    call $~lib/array/Array<src/views/idaStar/boardAstar/wasm/assembly/solver/HeapItem>#__get
    local.set $3
    global.get $~lib/memory/__stack_pointer
    local.get $3
    i32.store offset=4
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store offset=16
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.load
    local.tee $2
    i32.store offset=12
    local.get $2
    local.get $4
    call $~lib/array/Array<src/views/idaStar/boardAstar/wasm/assembly/solver/HeapItem>#__get
    local.set $2
    global.get $~lib/memory/__stack_pointer
    local.get $2
    i32.store offset=8
    local.get $3
    local.get $2
    call $src/views/idaStar/boardAstar/wasm/assembly/solver/MinHeap#less
   else
    i32.const 0
   end
   select
   local.tee $2
   i32.ne
   if
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store offset=4
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.load
    local.tee $3
    i32.store
    global.get $~lib/memory/__stack_pointer
    local.get $3
    local.get $1
    call $~lib/array/Array<src/views/idaStar/boardAstar/wasm/assembly/solver/HeapItem>#__get
    local.tee $5
    i32.store offset=20
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store offset=8
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.load
    local.tee $4
    i32.store
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store offset=12
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.load
    local.tee $3
    i32.store offset=8
    local.get $3
    local.get $2
    call $~lib/array/Array<src/views/idaStar/boardAstar/wasm/assembly/solver/HeapItem>#__get
    local.set $3
    global.get $~lib/memory/__stack_pointer
    local.get $3
    i32.store offset=4
    local.get $4
    local.get $1
    local.get $3
    call $~lib/array/Array<src/views/idaStar/boardAstar/wasm/assembly/solver/HeapItem>#__set
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store offset=8
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.load
    local.tee $1
    i32.store
    global.get $~lib/memory/__stack_pointer
    local.get $5
    i32.store offset=4
    local.get $1
    local.get $2
    local.get $5
    call $~lib/array/Array<src/views/idaStar/boardAstar/wasm/assembly/solver/HeapItem>#__set
    br $while-continue|0
   end
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 24
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
 (func $src/views/idaStar/boardAstar/wasm/assembly/solver/MinHeap#pop (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 20
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.const 20
  memory.fill
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store offset=4
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.load
  local.tee $2
  i32.store
  local.get $2
  call $~lib/array/Array<src/views/idaStar/boardAstar/wasm/assembly/solver/HeapItem>#get:length
  local.tee $4
  if
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store offset=4
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.load
   local.tee $1
   i32.store
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.const 0
   call $~lib/array/Array<src/views/idaStar/boardAstar/wasm/assembly/solver/HeapItem>#__get
   local.tee $1
   i32.store offset=8
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store offset=4
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.load
   local.tee $2
   i32.store
   global.get $~lib/memory/__stack_pointer
   global.get $~lib/memory/__stack_pointer
   i32.const 8
   i32.sub
   global.set $~lib/memory/__stack_pointer
   call $~stack_check
   global.get $~lib/memory/__stack_pointer
   i64.const 0
   i64.store
   global.get $~lib/memory/__stack_pointer
   local.get $2
   i32.store
   local.get $2
   i32.load offset=12
   local.tee $3
   i32.const 0
   i32.le_s
   if
    i32.const 2384
    i32.const 2208
    i32.const 271
    i32.const 18
    call $~lib/builtins/abort
    unreachable
   end
   global.get $~lib/memory/__stack_pointer
   local.get $2
   i32.store
   global.get $~lib/memory/__stack_pointer
   local.get $2
   i32.load offset=4
   local.get $3
   i32.const 1
   i32.sub
   local.tee $5
   i32.const 2
   i32.shl
   i32.add
   i32.load
   local.tee $3
   i32.store offset=4
   global.get $~lib/memory/__stack_pointer
   local.get $2
   i32.store
   local.get $2
   local.get $5
   i32.store offset=12
   global.get $~lib/memory/__stack_pointer
   i32.const 8
   i32.add
   global.set $~lib/memory/__stack_pointer
   local.get $3
   i32.store offset=12
   local.get $3
   i32.const 0
   local.get $4
   i32.const 1
   i32.gt_s
   select
   if
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store offset=16
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.load
    local.tee $2
    i32.store
    global.get $~lib/memory/__stack_pointer
    local.get $3
    i32.store offset=4
    local.get $2
    i32.const 0
    local.get $3
    call $~lib/array/Array<src/views/idaStar/boardAstar/wasm/assembly/solver/HeapItem>#__set
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store
    local.get $0
    call $src/views/idaStar/boardAstar/wasm/assembly/solver/MinHeap#siftDown
   end
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 20
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $1
 )
 (func $"~lib/map/Map<~lib/string/String,src/views/idaStar/boardAstar/wasm/assembly/solver/Node>#has" (param $0 i32) (param $1 i32) (result i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 12
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store offset=8
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.get $1
  i32.store offset=4
  global.get $~lib/memory/__stack_pointer
  local.get $1
  i32.store offset=8
  local.get $0
  local.get $1
  local.get $1
  call $~lib/util/hash/HASH<~lib/string/String>
  call $"~lib/map/Map<~lib/string/String,src/views/idaStar/boardAstar/wasm/assembly/solver/Node>#find"
  i32.const 0
  i32.ne
  local.set $0
  global.get $~lib/memory/__stack_pointer
  i32.const 12
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $"~lib/map/Map<~lib/string/String,src/views/idaStar/boardAstar/wasm/assembly/solver/Node>#get" (param $0 i32) (param $1 i32) (result i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 12
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store offset=8
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.get $1
  i32.store offset=4
  global.get $~lib/memory/__stack_pointer
  local.get $1
  i32.store offset=8
  local.get $0
  local.get $1
  local.get $1
  call $~lib/util/hash/HASH<~lib/string/String>
  call $"~lib/map/Map<~lib/string/String,src/views/idaStar/boardAstar/wasm/assembly/solver/Node>#find"
  local.tee $0
  i32.eqz
  if
   i32.const 2432
   i32.const 2496
   i32.const 105
   i32.const 17
   call $~lib/builtins/abort
   unreachable
  end
  local.get $0
  i32.load offset=4
  local.set $0
  global.get $~lib/memory/__stack_pointer
  i32.const 12
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $"~lib/map/Map<~lib/string/String,src/views/idaStar/boardAstar/wasm/assembly/solver/Node>#delete" (param $0 i32) (param $1 i32)
  (local $2 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 12
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store offset=8
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.get $1
  i32.store offset=4
  global.get $~lib/memory/__stack_pointer
  local.get $1
  i32.store offset=8
  local.get $0
  local.get $1
  local.get $1
  call $~lib/util/hash/HASH<~lib/string/String>
  call $"~lib/map/Map<~lib/string/String,src/views/idaStar/boardAstar/wasm/assembly/solver/Node>#find"
  local.tee $1
  if
   local.get $1
   local.get $1
   i32.load offset=8
   i32.const 1
   i32.or
   i32.store offset=8
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store offset=4
   local.get $0
   local.get $0
   i32.load offset=20
   i32.const 1
   i32.sub
   i32.store offset=20
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store
   local.get $0
   i32.load offset=4
   i32.const 1
   i32.shr_u
   local.set $1
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store
   local.get $1
   i32.const 1
   i32.add
   i32.const 4
   local.get $0
   i32.load offset=20
   local.tee $2
   local.get $2
   i32.const 4
   i32.lt_u
   select
   i32.ge_u
   if (result i32)
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store
    local.get $0
    i32.load offset=20
    local.set $2
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store
    local.get $2
    local.get $0
    i32.load offset=12
    i32.const 3
    i32.mul
    i32.const 4
    i32.div_s
    i32.lt_s
   else
    i32.const 0
   end
   if
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store
    local.get $0
    local.get $1
    call $"~lib/map/Map<~lib/string/String,src/views/idaStar/boardAstar/wasm/assembly/solver/Node>#rehash"
   end
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 12
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
 (func $src/views/idaStar/boardAstar/wasm/assembly/solver/decodeKey (param $0 i32) (param $1 i32)
  (local $2 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store
  loop $for-loop|0
   local.get $2
   global.get $src/views/idaStar/boardAstar/wasm/assembly/solver/n
   i32.lt_s
   if
    global.get $~lib/memory/__stack_pointer
    local.get $1
    i32.store
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store offset=4
    local.get $1
    local.get $2
    local.get $0
    local.get $2
    call $~lib/string/String#charCodeAt
    i32.const 255
    i32.and
    call $~lib/staticarray/StaticArray<u8>#__set
    local.get $2
    i32.const 1
    i32.add
    local.set $2
    br $for-loop|0
   end
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
 (func $src/views/idaStar/boardAstar/wasm/assembly/solver/appendPath (param $0 i32) (param $1 i32) (param $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 20
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.const 20
  memory.fill
  global.get $~lib/memory/__stack_pointer
  local.set $4
  global.get $~lib/memory/__stack_pointer
  i32.const 16
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store offset=8
  global.get $~lib/memory/__stack_pointer
  i32.const 16
  i32.const 11
  call $~lib/rt/itcms/__new
  local.tee $3
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.get $3
  i32.store offset=4
  local.get $3
  i32.const 0
  call $"~lib/map/Map<~lib/string/String,src/views/idaStar/boardAstar/wasm/assembly/solver/Node>#set:buckets"
  global.get $~lib/memory/__stack_pointer
  local.get $3
  i32.store offset=4
  local.get $3
  i32.const 0
  i32.store offset=4
  global.get $~lib/memory/__stack_pointer
  local.get $3
  i32.store offset=4
  local.get $3
  i32.const 0
  i32.store offset=8
  global.get $~lib/memory/__stack_pointer
  local.get $3
  i32.store offset=4
  local.get $3
  i32.const 0
  i32.store offset=12
  global.get $~lib/memory/__stack_pointer
  i32.const 32
  i32.const 1
  call $~lib/rt/itcms/__new
  local.tee $5
  i32.store offset=8
  global.get $~lib/memory/__stack_pointer
  local.get $3
  i32.store offset=4
  global.get $~lib/memory/__stack_pointer
  local.get $5
  i32.store offset=12
  local.get $3
  local.get $5
  call $"~lib/map/Map<~lib/string/String,src/views/idaStar/boardAstar/wasm/assembly/solver/Node>#set:buckets"
  global.get $~lib/memory/__stack_pointer
  local.get $3
  i32.store offset=4
  local.get $3
  local.get $5
  i32.store offset=4
  global.get $~lib/memory/__stack_pointer
  local.get $3
  i32.store offset=4
  local.get $3
  i32.const 32
  i32.store offset=8
  global.get $~lib/memory/__stack_pointer
  local.get $3
  i32.store offset=4
  local.get $3
  i32.const 0
  i32.store offset=12
  global.get $~lib/memory/__stack_pointer
  i32.const 16
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $4
  local.get $3
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.get $1
  i32.store offset=4
  loop $while-continue|0
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store offset=8
   local.get $1
   i32.const 20
   i32.sub
   i32.load offset=16
   i32.const 1
   i32.shr_u
   if (result i32)
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store offset=8
    global.get $~lib/memory/__stack_pointer
    local.get $1
    i32.store offset=12
    local.get $0
    local.get $1
    call $"~lib/map/Map<~lib/string/String,src/views/idaStar/boardAstar/wasm/assembly/solver/Node>#has"
   else
    i32.const 0
   end
   if
    block $while-break|0
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=8
     global.get $~lib/memory/__stack_pointer
     local.get $1
     i32.store offset=12
     global.get $~lib/memory/__stack_pointer
     local.get $0
     local.get $1
     call $"~lib/map/Map<~lib/string/String,src/views/idaStar/boardAstar/wasm/assembly/solver/Node>#get"
     local.tee $4
     i32.store offset=16
     global.get $~lib/memory/__stack_pointer
     local.get $4
     i32.store offset=12
     global.get $~lib/memory/__stack_pointer
     local.get $4
     i32.load offset=12
     local.tee $1
     i32.store offset=8
     local.get $1
     i32.const 20
     i32.sub
     i32.load offset=16
     i32.const 1
     i32.shr_u
     i32.eqz
     br_if $while-break|0
     global.get $~lib/memory/__stack_pointer
     local.get $3
     i32.store offset=8
     global.get $~lib/memory/__stack_pointer
     local.get $4
     i32.store offset=12
     local.get $4
     i32.load offset=8
     local.set $5
     global.get $~lib/memory/__stack_pointer
     i32.const 4
     i32.sub
     global.set $~lib/memory/__stack_pointer
     call $~stack_check
     global.get $~lib/memory/__stack_pointer
     i32.const 0
     i32.store
     global.get $~lib/memory/__stack_pointer
     local.get $3
     i32.store
     local.get $3
     local.get $3
     i32.load offset=12
     local.tee $6
     i32.const 1
     i32.add
     local.tee $1
     i32.const 1
     call $~lib/array/ensureCapacity
     global.get $~lib/memory/__stack_pointer
     local.get $3
     i32.store
     local.get $3
     i32.load offset=4
     local.get $6
     i32.const 2
     i32.shl
     i32.add
     local.get $5
     i32.store
     global.get $~lib/memory/__stack_pointer
     local.get $3
     i32.store
     local.get $3
     local.get $1
     i32.store offset=12
     global.get $~lib/memory/__stack_pointer
     i32.const 4
     i32.add
     global.set $~lib/memory/__stack_pointer
     global.get $~lib/memory/__stack_pointer
     local.get $4
     i32.store offset=8
     global.get $~lib/memory/__stack_pointer
     local.get $4
     i32.load offset=12
     local.tee $1
     i32.store offset=4
     br $while-continue|0
    end
   end
  end
  global.get $~lib/memory/__stack_pointer
  local.get $3
  i32.store offset=8
  local.get $3
  call $~lib/array/Array<src/views/idaStar/boardAstar/wasm/assembly/solver/HeapItem>#get:length
  i32.const 1
  i32.sub
  local.set $0
  loop $for-loop|1
   local.get $0
   i32.const 0
   i32.ge_s
   if
    global.get $~lib/memory/__stack_pointer
    local.get $3
    i32.store offset=8
    global.get $~lib/memory/__stack_pointer
    i32.const 4
    i32.sub
    global.set $~lib/memory/__stack_pointer
    call $~stack_check
    global.get $~lib/memory/__stack_pointer
    i32.const 0
    i32.store
    global.get $~lib/memory/__stack_pointer
    local.get $3
    i32.store
    local.get $0
    local.get $3
    i32.load offset=12
    i32.ge_u
    if
     i32.const 1360
     i32.const 2208
     i32.const 114
     i32.const 42
     call $~lib/builtins/abort
     unreachable
    end
    global.get $~lib/memory/__stack_pointer
    local.get $3
    i32.store
    local.get $3
    i32.load offset=4
    local.get $0
    i32.const 2
    i32.shl
    i32.add
    i32.load
    local.set $1
    global.get $~lib/memory/__stack_pointer
    i32.const 4
    i32.add
    global.set $~lib/memory/__stack_pointer
    local.get $2
    if
     local.get $1
     call $src/views/idaStar/boardAstar/wasm/assembly/solver/reverseDir
     local.set $1
    end
    global.get $~lib/memory/__stack_pointer
    i32.const 4
    i32.sub
    global.set $~lib/memory/__stack_pointer
    call $~stack_check
    global.get $~lib/memory/__stack_pointer
    i32.const 0
    i32.store
    global.get $src/views/idaStar/boardAstar/wasm/assembly/solver/outActionLen
    i32.const 200000
    i32.lt_s
    if
     global.get $~lib/memory/__stack_pointer
     global.get $src/views/idaStar/boardAstar/wasm/assembly/solver/outActions
     local.tee $4
     i32.store
     global.get $src/views/idaStar/boardAstar/wasm/assembly/solver/outActionLen
     local.tee $5
     i32.const 1
     i32.add
     global.set $src/views/idaStar/boardAstar/wasm/assembly/solver/outActionLen
     local.get $4
     local.get $5
     local.get $1
     call $~lib/staticarray/StaticArray<u8>#__set
    end
    global.get $~lib/memory/__stack_pointer
    i32.const 4
    i32.add
    global.set $~lib/memory/__stack_pointer
    local.get $0
    i32.const 1
    i32.sub
    local.set $0
    br $for-loop|1
   end
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 20
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
 (func $"~lib/map/Map<~lib/string/String,src/views/idaStar/boardAstar/wasm/assembly/solver/Node>#get:size" (param $0 i32) (result i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $0
  i32.load offset=20
  local.set $0
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $src/views/idaStar/boardAstar/wasm/assembly/solver/applyDir (param $0 i32) (param $1 i32) (param $2 i32) (result i32)
  (local $3 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store
  block $__inlined_func$src/views/idaStar/boardAstar/wasm/assembly/solver/moveEmpty$208 (result i32)
   local.get $1
   global.get $src/views/idaStar/boardAstar/wasm/assembly/solver/width
   i32.sub
   local.get $2
   i32.eqz
   br_if $__inlined_func$src/views/idaStar/boardAstar/wasm/assembly/solver/moveEmpty$208
   drop
   local.get $1
   i32.const 1
   i32.add
   local.get $2
   i32.const 1
   i32.eq
   br_if $__inlined_func$src/views/idaStar/boardAstar/wasm/assembly/solver/moveEmpty$208
   drop
   local.get $1
   global.get $src/views/idaStar/boardAstar/wasm/assembly/solver/width
   i32.add
   local.get $2
   i32.const 2
   i32.eq
   br_if $__inlined_func$src/views/idaStar/boardAstar/wasm/assembly/solver/moveEmpty$208
   drop
   local.get $1
   i32.const 1
   i32.sub
  end
  local.set $3
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $0
  local.get $1
  call $~lib/staticarray/StaticArray<u8>#__get
  local.set $2
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store offset=4
  local.get $0
  local.get $1
  local.get $0
  local.get $3
  call $~lib/staticarray/StaticArray<u8>#__get
  call $~lib/staticarray/StaticArray<u8>#__set
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $0
  local.get $3
  local.get $2
  call $~lib/staticarray/StaticArray<u8>#__set
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $3
 )
 (func $src/views/idaStar/boardAstar/wasm/assembly/solver/solveWindow (result i32)
  (local $0 i32)
  (local $1 f64)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  (local $8 i32)
  (local $9 i32)
  (local $10 i32)
  (local $11 i32)
  (local $12 i32)
  (local $13 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 52
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.const 52
  memory.fill
  global.get $src/views/idaStar/boardAstar/wasm/assembly/solver/outActionLen
  local.set $4
  global.get $~lib/memory/__stack_pointer
  global.get $src/views/idaStar/boardAstar/wasm/assembly/solver/curList
  local.tee $0
  i32.store
  local.get $0
  call $src/views/idaStar/boardAstar/wasm/assembly/solver/isFocusDone
  if
   global.get $~lib/memory/__stack_pointer
   i32.const 52
   i32.add
   global.set $~lib/memory/__stack_pointer
   i32.const 0
   return
  end
  global.get $~lib/memory/__stack_pointer
  call $"~lib/map/Map<~lib/string/String,src/views/idaStar/boardAstar/wasm/assembly/solver/Node>#constructor"
  local.tee $5
  i32.store offset=4
  global.get $~lib/memory/__stack_pointer
  call $"~lib/map/Map<~lib/string/String,src/views/idaStar/boardAstar/wasm/assembly/solver/Node>#constructor"
  local.tee $0
  i32.store offset=8
  global.get $~lib/memory/__stack_pointer
  call $src/views/idaStar/boardAstar/wasm/assembly/solver/MinHeap#constructor
  local.tee $10
  i32.store offset=12
  global.get $~lib/memory/__stack_pointer
  i32.const 64
  call $~lib/staticarray/StaticArray<u8>#constructor
  local.tee $11
  i32.store offset=16
  global.get $~lib/memory/__stack_pointer
  global.get $src/views/idaStar/boardAstar/wasm/assembly/solver/curList
  local.tee $2
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.get $2
  call $src/views/idaStar/boardAstar/wasm/assembly/solver/boardKey
  local.tee $2
  i32.store offset=20
  global.get $~lib/memory/__stack_pointer
  global.get $src/views/idaStar/boardAstar/wasm/assembly/solver/curList
  local.tee $6
  i32.store
  local.get $6
  call $src/views/idaStar/boardAstar/wasm/assembly/solver/findEmpty
  local.set $6
  global.get $~lib/memory/__stack_pointer
  global.get $src/views/idaStar/boardAstar/wasm/assembly/solver/curList
  local.tee $7
  i32.store
  i32.const 0
  local.get $7
  call $src/views/idaStar/boardAstar/wasm/assembly/solver/calcWinValue
  local.set $1
  global.get $~lib/memory/__stack_pointer
  local.get $5
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.get $2
  i32.store offset=24
  global.get $~lib/memory/__stack_pointer
  i32.const 1920
  i32.store offset=32
  i32.const 0
  local.get $6
  i32.const 2
  i32.const 1920
  local.get $1
  call $src/views/idaStar/boardAstar/wasm/assembly/solver/Node#constructor
  local.set $6
  global.get $~lib/memory/__stack_pointer
  local.get $6
  i32.store offset=28
  local.get $5
  local.get $2
  local.get $6
  call $"~lib/map/Map<~lib/string/String,src/views/idaStar/boardAstar/wasm/assembly/solver/Node>#set"
  global.get $~lib/memory/__stack_pointer
  local.get $10
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.get $2
  i32.store offset=28
  local.get $2
  local.get $1
  i32.const 0
  call $src/views/idaStar/boardAstar/wasm/assembly/solver/HeapItem#constructor
  local.set $2
  global.get $~lib/memory/__stack_pointer
  local.get $2
  i32.store offset=24
  local.get $10
  local.get $2
  call $src/views/idaStar/boardAstar/wasm/assembly/solver/MinHeap#push
  loop $while-continue|0
   global.get $~lib/memory/__stack_pointer
   local.get $10
   i32.store
   local.get $10
   call $src/views/idaStar/boardAstar/wasm/assembly/solver/MinHeap#get:size
   i32.const 0
   i32.gt_s
   if
    global.get $~lib/memory/__stack_pointer
    local.get $10
    i32.store
    global.get $~lib/memory/__stack_pointer
    local.get $10
    call $src/views/idaStar/boardAstar/wasm/assembly/solver/MinHeap#pop
    local.tee $6
    i32.store offset=36
    local.get $6
    if (result i32)
     global.get $~lib/memory/__stack_pointer
     local.get $5
     i32.store
     global.get $~lib/memory/__stack_pointer
     local.get $6
     i32.store offset=28
     global.get $~lib/memory/__stack_pointer
     local.get $6
     i32.load
     local.tee $2
     i32.store offset=24
     local.get $5
     local.get $2
     call $"~lib/map/Map<~lib/string/String,src/views/idaStar/boardAstar/wasm/assembly/solver/Node>#has"
    else
     i32.const 0
    end
    i32.eqz
    br_if $while-continue|0
    global.get $~lib/memory/__stack_pointer
    local.get $5
    i32.store
    global.get $~lib/memory/__stack_pointer
    local.get $6
    i32.store offset=28
    global.get $~lib/memory/__stack_pointer
    local.get $6
    i32.load
    local.tee $2
    i32.store offset=24
    global.get $~lib/memory/__stack_pointer
    local.get $5
    local.get $2
    call $"~lib/map/Map<~lib/string/String,src/views/idaStar/boardAstar/wasm/assembly/solver/Node>#get"
    local.tee $7
    i32.store offset=40
    global.get $~lib/memory/__stack_pointer
    local.get $7
    i32.store
    local.get $7
    f64.load offset=16
    local.set $1
    global.get $~lib/memory/__stack_pointer
    local.get $6
    i32.store
    local.get $1
    local.get $6
    f64.load offset=8
    f64.ne
    br_if $while-continue|0
    global.get $~lib/memory/__stack_pointer
    local.get $5
    i32.store
    global.get $~lib/memory/__stack_pointer
    local.get $6
    i32.store offset=28
    global.get $~lib/memory/__stack_pointer
    local.get $6
    i32.load
    local.tee $2
    i32.store offset=24
    local.get $5
    local.get $2
    call $"~lib/map/Map<~lib/string/String,src/views/idaStar/boardAstar/wasm/assembly/solver/Node>#delete"
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store
    global.get $~lib/memory/__stack_pointer
    local.get $6
    i32.store offset=32
    global.get $~lib/memory/__stack_pointer
    local.get $6
    i32.load
    local.tee $2
    i32.store offset=24
    global.get $~lib/memory/__stack_pointer
    local.get $7
    i32.store offset=28
    local.get $0
    local.get $2
    local.get $7
    call $"~lib/map/Map<~lib/string/String,src/views/idaStar/boardAstar/wasm/assembly/solver/Node>#set"
    global.get $~lib/memory/__stack_pointer
    local.get $6
    i32.store offset=28
    global.get $~lib/memory/__stack_pointer
    local.get $6
    i32.load
    local.tee $2
    i32.store
    global.get $~lib/memory/__stack_pointer
    local.get $11
    i32.store offset=24
    local.get $2
    local.get $11
    call $src/views/idaStar/boardAstar/wasm/assembly/solver/decodeKey
    global.get $~lib/memory/__stack_pointer
    local.get $11
    i32.store
    local.get $11
    call $src/views/idaStar/boardAstar/wasm/assembly/solver/isFocusDone
    if
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store
     global.get $~lib/memory/__stack_pointer
     local.get $6
     i32.store offset=28
     global.get $~lib/memory/__stack_pointer
     local.get $6
     i32.load
     local.tee $2
     i32.store offset=24
     local.get $0
     local.get $2
     i32.const 0
     call $src/views/idaStar/boardAstar/wasm/assembly/solver/appendPath
     global.get $~lib/memory/__stack_pointer
     local.get $5
     i32.store
     global.get $src/views/idaStar/boardAstar/wasm/assembly/solver/stateCntTotal
     local.set $2
     local.get $5
     call $"~lib/map/Map<~lib/string/String,src/views/idaStar/boardAstar/wasm/assembly/solver/Node>#get:size"
     local.set $5
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store
     local.get $2
     local.get $0
     call $"~lib/map/Map<~lib/string/String,src/views/idaStar/boardAstar/wasm/assembly/solver/Node>#get:size"
     local.get $5
     i32.add
     i32.add
     global.set $src/views/idaStar/boardAstar/wasm/assembly/solver/stateCntTotal
     global.get $src/views/idaStar/boardAstar/wasm/assembly/solver/expandCnt
     local.get $3
     i32.add
     global.set $src/views/idaStar/boardAstar/wasm/assembly/solver/expandCnt
     global.get $~lib/memory/__stack_pointer
     i32.const 52
     i32.add
     global.set $~lib/memory/__stack_pointer
     global.get $src/views/idaStar/boardAstar/wasm/assembly/solver/outActionLen
     local.get $4
     i32.sub
     return
    end
    i32.const 0
    local.set $2
    loop $for-loop|1
     local.get $2
     i32.const 4
     i32.lt_s
     if
      global.get $~lib/memory/__stack_pointer
      local.get $7
      i32.store
      block $for-continue|1
       local.get $7
       i32.load
       i32.const 0
       i32.gt_s
       if (result i32)
        global.get $~lib/memory/__stack_pointer
        local.get $7
        i32.store
        local.get $7
        i32.load offset=8
        call $src/views/idaStar/boardAstar/wasm/assembly/solver/reverseDir
        local.get $2
        i32.eq
       else
        i32.const 0
       end
       br_if $for-continue|1
       global.get $~lib/memory/__stack_pointer
       local.get $7
       i32.store
       local.get $7
       i32.load offset=4
       local.get $2
       call $src/views/idaStar/boardAstar/wasm/assembly/solver/canMove
       i32.eqz
       br_if $for-continue|1
       global.get $~lib/memory/__stack_pointer
       local.get $6
       i32.store offset=28
       global.get $~lib/memory/__stack_pointer
       local.get $6
       i32.load
       local.tee $8
       i32.store
       global.get $~lib/memory/__stack_pointer
       local.get $11
       i32.store offset=24
       local.get $8
       local.get $11
       call $src/views/idaStar/boardAstar/wasm/assembly/solver/decodeKey
       global.get $~lib/memory/__stack_pointer
       local.get $11
       i32.store
       global.get $~lib/memory/__stack_pointer
       local.get $7
       i32.store offset=24
       local.get $11
       local.get $7
       i32.load offset=4
       local.get $2
       call $src/views/idaStar/boardAstar/wasm/assembly/solver/applyDir
       local.set $12
       global.get $~lib/memory/__stack_pointer
       local.get $11
       i32.store
       global.get $~lib/memory/__stack_pointer
       local.get $11
       call $src/views/idaStar/boardAstar/wasm/assembly/solver/boardKey
       local.tee $8
       i32.store offset=44
       global.get $~lib/memory/__stack_pointer
       local.get $0
       i32.store
       global.get $~lib/memory/__stack_pointer
       local.get $8
       i32.store offset=24
       local.get $0
       local.get $8
       call $"~lib/map/Map<~lib/string/String,src/views/idaStar/boardAstar/wasm/assembly/solver/Node>#has"
       if (result i32)
        i32.const 1
       else
        global.get $~lib/memory/__stack_pointer
        local.get $5
        i32.store
        global.get $~lib/memory/__stack_pointer
        local.get $8
        i32.store offset=24
        local.get $5
        local.get $8
        call $"~lib/map/Map<~lib/string/String,src/views/idaStar/boardAstar/wasm/assembly/solver/Node>#has"
       end
       br_if $for-continue|1
       global.get $~lib/memory/__stack_pointer
       local.get $7
       i32.store
       local.get $7
       i32.load
       i32.const 1
       i32.add
       local.set $13
       global.get $~lib/memory/__stack_pointer
       local.get $11
       i32.store
       local.get $13
       local.get $11
       call $src/views/idaStar/boardAstar/wasm/assembly/solver/calcWinValue
       local.set $1
       global.get $~lib/memory/__stack_pointer
       local.get $5
       i32.store
       global.get $~lib/memory/__stack_pointer
       local.get $8
       i32.store offset=24
       global.get $~lib/memory/__stack_pointer
       local.get $6
       i32.store offset=48
       global.get $~lib/memory/__stack_pointer
       local.get $6
       i32.load
       local.tee $9
       i32.store offset=32
       local.get $13
       local.get $12
       local.get $2
       local.get $9
       local.get $1
       call $src/views/idaStar/boardAstar/wasm/assembly/solver/Node#constructor
       local.set $9
       global.get $~lib/memory/__stack_pointer
       local.get $9
       i32.store offset=28
       local.get $5
       local.get $8
       local.get $9
       call $"~lib/map/Map<~lib/string/String,src/views/idaStar/boardAstar/wasm/assembly/solver/Node>#set"
       global.get $~lib/memory/__stack_pointer
       local.get $10
       i32.store
       global.get $~lib/memory/__stack_pointer
       local.get $8
       i32.store offset=28
       local.get $8
       local.get $1
       local.get $13
       call $src/views/idaStar/boardAstar/wasm/assembly/solver/HeapItem#constructor
       local.set $8
       global.get $~lib/memory/__stack_pointer
       local.get $8
       i32.store offset=24
       local.get $10
       local.get $8
       call $src/views/idaStar/boardAstar/wasm/assembly/solver/MinHeap#push
       local.get $3
       i32.const 1
       i32.add
       local.set $3
      end
      local.get $2
      i32.const 1
      i32.add
      local.set $2
      br $for-loop|1
     end
    end
    br $while-continue|0
   end
  end
  global.get $~lib/memory/__stack_pointer
  local.get $5
  i32.store
  global.get $src/views/idaStar/boardAstar/wasm/assembly/solver/stateCntTotal
  local.set $2
  local.get $5
  call $"~lib/map/Map<~lib/string/String,src/views/idaStar/boardAstar/wasm/assembly/solver/Node>#get:size"
  local.set $4
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $2
  local.get $0
  call $"~lib/map/Map<~lib/string/String,src/views/idaStar/boardAstar/wasm/assembly/solver/Node>#get:size"
  local.get $4
  i32.add
  i32.add
  global.set $src/views/idaStar/boardAstar/wasm/assembly/solver/stateCntTotal
  global.get $src/views/idaStar/boardAstar/wasm/assembly/solver/expandCnt
  local.get $3
  i32.add
  global.set $src/views/idaStar/boardAstar/wasm/assembly/solver/expandCnt
  i32.const 1
  global.set $src/views/idaStar/boardAstar/wasm/assembly/solver/lastError
  global.get $~lib/memory/__stack_pointer
  i32.const 52
  i32.add
  global.set $~lib/memory/__stack_pointer
  i32.const -1
 )
 (func $~lib/array/Array<~lib/string/String>#constructor (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 16
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store offset=8
  global.get $~lib/memory/__stack_pointer
  i32.const 16
  i32.const 12
  call $~lib/rt/itcms/__new
  local.tee $1
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.get $1
  i32.store offset=4
  local.get $1
  i32.const 0
  call $"~lib/map/Map<~lib/string/String,src/views/idaStar/boardAstar/wasm/assembly/solver/Node>#set:buckets"
  global.get $~lib/memory/__stack_pointer
  local.get $1
  i32.store offset=4
  local.get $1
  i32.const 0
  i32.store offset=4
  global.get $~lib/memory/__stack_pointer
  local.get $1
  i32.store offset=4
  local.get $1
  i32.const 0
  i32.store offset=8
  global.get $~lib/memory/__stack_pointer
  local.get $1
  i32.store offset=4
  local.get $1
  i32.const 0
  i32.store offset=12
  local.get $0
  i32.const 268435455
  i32.gt_u
  if
   i32.const 1056
   i32.const 2208
   i32.const 70
   i32.const 60
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  local.get $0
  local.get $0
  i32.const 8
  i32.le_u
  select
  i32.const 2
  i32.shl
  local.tee $3
  i32.const 1
  call $~lib/rt/itcms/__new
  local.tee $2
  i32.store offset=8
  global.get $~lib/memory/__stack_pointer
  local.get $1
  i32.store offset=4
  global.get $~lib/memory/__stack_pointer
  local.get $2
  i32.store offset=12
  local.get $1
  local.get $2
  call $"~lib/map/Map<~lib/string/String,src/views/idaStar/boardAstar/wasm/assembly/solver/Node>#set:buckets"
  global.get $~lib/memory/__stack_pointer
  local.get $1
  i32.store offset=4
  local.get $1
  local.get $2
  i32.store offset=4
  global.get $~lib/memory/__stack_pointer
  local.get $1
  i32.store offset=4
  local.get $1
  local.get $3
  i32.store offset=8
  global.get $~lib/memory/__stack_pointer
  local.get $1
  i32.store offset=4
  local.get $1
  local.get $0
  i32.store offset=12
  global.get $~lib/memory/__stack_pointer
  i32.const 16
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $1
 )
 (func $"~lib/map/Map<~lib/string/String,src/views/idaStar/boardAstar/wasm/assembly/solver/Node>#keys" (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 12
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store offset=8
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $0
  i32.load offset=8
  local.set $3
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.load offset=16
  local.tee $4
  call $~lib/array/Array<~lib/string/String>#constructor
  local.tee $0
  i32.store offset=4
  loop $for-loop|0
   local.get $2
   local.get $4
   i32.lt_s
   if
    local.get $3
    local.get $2
    i32.const 12
    i32.mul
    i32.add
    local.tee $5
    i32.load offset=8
    i32.const 1
    i32.and
    i32.eqz
    if
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store
     global.get $~lib/memory/__stack_pointer
     local.get $5
     i32.load
     local.tee $5
     i32.store offset=8
     local.get $0
     local.get $1
     local.get $5
     call $~lib/array/Array<src/views/idaStar/boardAstar/wasm/assembly/solver/HeapItem>#__set
     local.get $1
     i32.const 1
     i32.add
     local.set $1
    end
    local.get $2
    i32.const 1
    i32.add
    local.set $2
    br $for-loop|0
   end
  end
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  local.get $0
  local.get $1
  i32.const 0
  call $~lib/array/ensureCapacity
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $0
  local.get $1
  i32.store offset=12
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 12
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $src/views/idaStar/boardAstar/wasm/assembly/solver/mergeMaps (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 36
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.const 36
  memory.fill
  global.get $~lib/memory/__stack_pointer
  call $"~lib/map/Map<~lib/string/String,src/views/idaStar/boardAstar/wasm/assembly/solver/Node>#constructor"
  local.tee $3
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store offset=4
  global.get $~lib/memory/__stack_pointer
  local.get $0
  call $"~lib/map/Map<~lib/string/String,src/views/idaStar/boardAstar/wasm/assembly/solver/Node>#keys"
  local.tee $5
  i32.store offset=8
  loop $for-loop|0
   global.get $~lib/memory/__stack_pointer
   local.get $5
   i32.store offset=4
   local.get $5
   call $~lib/array/Array<src/views/idaStar/boardAstar/wasm/assembly/solver/HeapItem>#get:length
   local.get $2
   i32.gt_s
   if
    global.get $~lib/memory/__stack_pointer
    local.get $3
    i32.store offset=4
    global.get $~lib/memory/__stack_pointer
    local.get $5
    i32.store offset=20
    local.get $5
    local.get $2
    call $~lib/array/Array<src/views/idaStar/boardAstar/wasm/assembly/solver/HeapItem>#__get
    local.set $6
    global.get $~lib/memory/__stack_pointer
    local.get $6
    i32.store offset=12
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store offset=20
    global.get $~lib/memory/__stack_pointer
    local.get $5
    i32.store offset=28
    local.get $5
    local.get $2
    call $~lib/array/Array<src/views/idaStar/boardAstar/wasm/assembly/solver/HeapItem>#__get
    local.set $7
    global.get $~lib/memory/__stack_pointer
    local.get $7
    i32.store offset=24
    local.get $0
    local.get $7
    call $"~lib/map/Map<~lib/string/String,src/views/idaStar/boardAstar/wasm/assembly/solver/Node>#get"
    local.set $7
    global.get $~lib/memory/__stack_pointer
    local.get $7
    i32.store offset=16
    local.get $3
    local.get $6
    local.get $7
    call $"~lib/map/Map<~lib/string/String,src/views/idaStar/boardAstar/wasm/assembly/solver/Node>#set"
    local.get $2
    i32.const 1
    i32.add
    local.set $2
    br $for-loop|0
   end
  end
  global.get $~lib/memory/__stack_pointer
  local.get $1
  i32.store offset=4
  global.get $~lib/memory/__stack_pointer
  local.get $1
  call $"~lib/map/Map<~lib/string/String,src/views/idaStar/boardAstar/wasm/assembly/solver/Node>#keys"
  local.tee $0
  i32.store offset=32
  loop $for-loop|1
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store offset=4
   local.get $0
   call $~lib/array/Array<src/views/idaStar/boardAstar/wasm/assembly/solver/HeapItem>#get:length
   local.get $4
   i32.gt_s
   if
    global.get $~lib/memory/__stack_pointer
    local.get $3
    i32.store offset=4
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store offset=20
    local.get $0
    local.get $4
    call $~lib/array/Array<src/views/idaStar/boardAstar/wasm/assembly/solver/HeapItem>#__get
    local.set $2
    global.get $~lib/memory/__stack_pointer
    local.get $2
    i32.store offset=12
    global.get $~lib/memory/__stack_pointer
    local.get $1
    i32.store offset=20
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store offset=28
    local.get $0
    local.get $4
    call $~lib/array/Array<src/views/idaStar/boardAstar/wasm/assembly/solver/HeapItem>#__get
    local.set $5
    global.get $~lib/memory/__stack_pointer
    local.get $5
    i32.store offset=24
    local.get $1
    local.get $5
    call $"~lib/map/Map<~lib/string/String,src/views/idaStar/boardAstar/wasm/assembly/solver/Node>#get"
    local.set $5
    global.get $~lib/memory/__stack_pointer
    local.get $5
    i32.store offset=16
    local.get $3
    local.get $2
    local.get $5
    call $"~lib/map/Map<~lib/string/String,src/views/idaStar/boardAstar/wasm/assembly/solver/Node>#set"
    local.get $4
    i32.const 1
    i32.add
    local.set $4
    br $for-loop|1
   end
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 36
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $3
 )
 (func $src/views/idaStar/boardAstar/wasm/assembly/solver/solveBi (result i32)
  (local $0 i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 f64)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  (local $8 i32)
  (local $9 i32)
  (local $10 i32)
  (local $11 i32)
  (local $12 i32)
  (local $13 i32)
  (local $14 i32)
  (local $15 i32)
  (local $16 i32)
  (local $17 i32)
  (local $18 i32)
  (local $19 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 88
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.const 88
  memory.fill
  global.get $src/views/idaStar/boardAstar/wasm/assembly/solver/outActionLen
  local.set $13
  global.get $~lib/memory/__stack_pointer
  global.get $src/views/idaStar/boardAstar/wasm/assembly/solver/curList
  local.tee $1
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.get $1
  call $src/views/idaStar/boardAstar/wasm/assembly/solver/boardKey
  local.tee $10
  i32.store offset=4
  global.get $~lib/memory/__stack_pointer
  global.get $src/views/idaStar/boardAstar/wasm/assembly/solver/finish
  local.tee $1
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.get $1
  call $src/views/idaStar/boardAstar/wasm/assembly/solver/boardKey
  local.tee $11
  i32.store offset=8
  global.get $~lib/memory/__stack_pointer
  local.get $10
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.get $11
  i32.store offset=12
  local.get $10
  local.get $11
  call $~lib/string/String.__eq
  if
   global.get $~lib/memory/__stack_pointer
   i32.const 88
   i32.add
   global.set $~lib/memory/__stack_pointer
   i32.const 0
   return
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 64
  call $~lib/staticarray/StaticArray<i32>#constructor
  local.tee $12
  i32.store offset=16
  loop $for-loop|0
   local.get $0
   global.get $src/views/idaStar/boardAstar/wasm/assembly/solver/n
   i32.lt_s
   if
    global.get $~lib/memory/__stack_pointer
    local.get $12
    i32.store
    global.get $~lib/memory/__stack_pointer
    global.get $src/views/idaStar/boardAstar/wasm/assembly/solver/curList
    local.tee $1
    i32.store offset=12
    local.get $12
    local.get $1
    local.get $0
    call $~lib/staticarray/StaticArray<u8>#__get
    local.get $0
    call $~lib/staticarray/StaticArray<i32>#__set
    local.get $0
    i32.const 1
    i32.add
    local.set $0
    br $for-loop|0
   end
  end
  global.get $~lib/memory/__stack_pointer
  call $"~lib/map/Map<~lib/string/String,src/views/idaStar/boardAstar/wasm/assembly/solver/Node>#constructor"
  local.tee $2
  i32.store offset=20
  global.get $~lib/memory/__stack_pointer
  call $"~lib/map/Map<~lib/string/String,src/views/idaStar/boardAstar/wasm/assembly/solver/Node>#constructor"
  local.tee $6
  i32.store offset=24
  global.get $~lib/memory/__stack_pointer
  call $"~lib/map/Map<~lib/string/String,src/views/idaStar/boardAstar/wasm/assembly/solver/Node>#constructor"
  local.tee $3
  i32.store offset=28
  global.get $~lib/memory/__stack_pointer
  call $"~lib/map/Map<~lib/string/String,src/views/idaStar/boardAstar/wasm/assembly/solver/Node>#constructor"
  local.tee $7
  i32.store offset=32
  global.get $~lib/memory/__stack_pointer
  call $src/views/idaStar/boardAstar/wasm/assembly/solver/MinHeap#constructor
  local.tee $8
  i32.store offset=36
  global.get $~lib/memory/__stack_pointer
  call $src/views/idaStar/boardAstar/wasm/assembly/solver/MinHeap#constructor
  local.tee $9
  i32.store offset=40
  global.get $~lib/memory/__stack_pointer
  i32.const 64
  call $~lib/staticarray/StaticArray<u8>#constructor
  local.tee $14
  i32.store offset=44
  global.get $~lib/memory/__stack_pointer
  global.get $src/views/idaStar/boardAstar/wasm/assembly/solver/curList
  local.tee $0
  i32.store
  local.get $0
  call $src/views/idaStar/boardAstar/wasm/assembly/solver/findEmpty
  local.set $0
  global.get $~lib/memory/__stack_pointer
  global.get $src/views/idaStar/boardAstar/wasm/assembly/solver/curList
  local.tee $1
  i32.store
  global.get $~lib/memory/__stack_pointer
  global.get $src/views/idaStar/boardAstar/wasm/assembly/solver/finishPos
  local.tee $5
  i32.store offset=12
  local.get $1
  local.get $5
  i32.const 0
  call $src/views/idaStar/boardAstar/wasm/assembly/solver/manhattanTo
  local.set $4
  global.get $~lib/memory/__stack_pointer
  local.get $2
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.get $10
  i32.store offset=12
  global.get $~lib/memory/__stack_pointer
  i32.const 1920
  i32.store offset=52
  i32.const 0
  local.get $0
  i32.const 2
  i32.const 1920
  local.get $4
  call $src/views/idaStar/boardAstar/wasm/assembly/solver/Node#constructor
  local.set $0
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store offset=48
  local.get $2
  local.get $10
  local.get $0
  call $"~lib/map/Map<~lib/string/String,src/views/idaStar/boardAstar/wasm/assembly/solver/Node>#set"
  global.get $~lib/memory/__stack_pointer
  local.get $8
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.get $10
  i32.store offset=48
  local.get $10
  local.get $4
  i32.const 0
  call $src/views/idaStar/boardAstar/wasm/assembly/solver/HeapItem#constructor
  local.set $0
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store offset=12
  local.get $8
  local.get $0
  call $src/views/idaStar/boardAstar/wasm/assembly/solver/MinHeap#push
  global.get $~lib/memory/__stack_pointer
  global.get $src/views/idaStar/boardAstar/wasm/assembly/solver/finish
  local.tee $0
  i32.store
  local.get $0
  call $src/views/idaStar/boardAstar/wasm/assembly/solver/findEmpty
  local.set $0
  global.get $~lib/memory/__stack_pointer
  global.get $src/views/idaStar/boardAstar/wasm/assembly/solver/finish
  local.tee $1
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.get $12
  i32.store offset=12
  local.get $1
  local.get $12
  i32.const 0
  call $src/views/idaStar/boardAstar/wasm/assembly/solver/manhattanTo
  local.set $4
  global.get $~lib/memory/__stack_pointer
  local.get $3
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.get $11
  i32.store offset=12
  global.get $~lib/memory/__stack_pointer
  i32.const 1920
  i32.store offset=52
  i32.const 0
  local.get $0
  i32.const 2
  i32.const 1920
  local.get $4
  call $src/views/idaStar/boardAstar/wasm/assembly/solver/Node#constructor
  local.set $0
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store offset=48
  local.get $3
  local.get $11
  local.get $0
  call $"~lib/map/Map<~lib/string/String,src/views/idaStar/boardAstar/wasm/assembly/solver/Node>#set"
  global.get $~lib/memory/__stack_pointer
  local.get $9
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.get $11
  i32.store offset=48
  local.get $11
  local.get $4
  i32.const 0
  call $src/views/idaStar/boardAstar/wasm/assembly/solver/HeapItem#constructor
  local.set $0
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store offset=12
  local.get $9
  local.get $0
  call $src/views/idaStar/boardAstar/wasm/assembly/solver/MinHeap#push
  i32.const 1920
  local.set $0
  global.get $~lib/memory/__stack_pointer
  i32.const 1920
  i32.store offset=56
  loop $while-continue|1
   global.get $~lib/memory/__stack_pointer
   local.get $8
   i32.store
   local.get $8
   call $src/views/idaStar/boardAstar/wasm/assembly/solver/MinHeap#get:size
   i32.const 0
   i32.gt_s
   if (result i32)
    i32.const 1
   else
    global.get $~lib/memory/__stack_pointer
    local.get $9
    i32.store
    local.get $9
    call $src/views/idaStar/boardAstar/wasm/assembly/solver/MinHeap#get:size
    i32.const 0
    i32.gt_s
   end
   if (result i32)
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store
    local.get $0
    i32.const 20
    i32.sub
    i32.load offset=16
    i32.const 1
    i32.shr_u
   else
    i32.const 1
   end
   i32.eqz
   if
    block $while-break|1
     global.get $~lib/memory/__stack_pointer
     local.get $8
     i32.store
     local.get $8
     call $src/views/idaStar/boardAstar/wasm/assembly/solver/MinHeap#get:size
     i32.const 0
     i32.gt_s
     if
      global.get $~lib/memory/__stack_pointer
      local.get $8
      i32.store
      global.get $~lib/memory/__stack_pointer
      local.get $8
      call $src/views/idaStar/boardAstar/wasm/assembly/solver/MinHeap#pop
      local.tee $15
      i32.store offset=60
      local.get $15
      if (result i32)
       global.get $~lib/memory/__stack_pointer
       local.get $2
       i32.store
       global.get $~lib/memory/__stack_pointer
       local.get $15
       i32.store offset=48
       global.get $~lib/memory/__stack_pointer
       local.get $15
       i32.load
       local.tee $1
       i32.store offset=12
       local.get $2
       local.get $1
       call $"~lib/map/Map<~lib/string/String,src/views/idaStar/boardAstar/wasm/assembly/solver/Node>#has"
      else
       i32.const 0
      end
      if
       global.get $~lib/memory/__stack_pointer
       local.get $2
       i32.store
       global.get $~lib/memory/__stack_pointer
       local.get $15
       i32.store offset=48
       global.get $~lib/memory/__stack_pointer
       local.get $15
       i32.load
       local.tee $1
       i32.store offset=12
       global.get $~lib/memory/__stack_pointer
       local.get $2
       local.get $1
       call $"~lib/map/Map<~lib/string/String,src/views/idaStar/boardAstar/wasm/assembly/solver/Node>#get"
       local.tee $16
       i32.store offset=64
       global.get $~lib/memory/__stack_pointer
       local.get $16
       i32.store
       local.get $16
       f64.load offset=16
       local.set $4
       global.get $~lib/memory/__stack_pointer
       local.get $15
       i32.store
       local.get $4
       local.get $15
       f64.load offset=8
       f64.eq
       if
        global.get $~lib/memory/__stack_pointer
        local.get $2
        i32.store
        global.get $~lib/memory/__stack_pointer
        local.get $15
        i32.store offset=48
        global.get $~lib/memory/__stack_pointer
        local.get $15
        i32.load
        local.tee $1
        i32.store offset=12
        local.get $2
        local.get $1
        call $"~lib/map/Map<~lib/string/String,src/views/idaStar/boardAstar/wasm/assembly/solver/Node>#delete"
        global.get $~lib/memory/__stack_pointer
        local.get $6
        i32.store
        global.get $~lib/memory/__stack_pointer
        local.get $15
        i32.store offset=52
        global.get $~lib/memory/__stack_pointer
        local.get $15
        i32.load
        local.tee $1
        i32.store offset=12
        global.get $~lib/memory/__stack_pointer
        local.get $16
        i32.store offset=48
        local.get $6
        local.get $1
        local.get $16
        call $"~lib/map/Map<~lib/string/String,src/views/idaStar/boardAstar/wasm/assembly/solver/Node>#set"
        global.get $~lib/memory/__stack_pointer
        local.get $15
        i32.store offset=48
        global.get $~lib/memory/__stack_pointer
        local.get $15
        i32.load
        local.tee $1
        i32.store
        global.get $~lib/memory/__stack_pointer
        local.get $11
        i32.store offset=12
        local.get $1
        local.get $11
        call $~lib/string/String.__eq
        if (result i32)
         i32.const 1
        else
         global.get $~lib/memory/__stack_pointer
         local.get $3
         i32.store
         global.get $~lib/memory/__stack_pointer
         local.get $15
         i32.store offset=48
         global.get $~lib/memory/__stack_pointer
         local.get $15
         i32.load
         local.tee $1
         i32.store offset=12
         local.get $3
         local.get $1
         call $"~lib/map/Map<~lib/string/String,src/views/idaStar/boardAstar/wasm/assembly/solver/Node>#has"
        end
        if (result i32)
         i32.const 1
        else
         global.get $~lib/memory/__stack_pointer
         local.get $7
         i32.store
         global.get $~lib/memory/__stack_pointer
         local.get $15
         i32.store offset=48
         global.get $~lib/memory/__stack_pointer
         local.get $15
         i32.load
         local.tee $1
         i32.store offset=12
         local.get $7
         local.get $1
         call $"~lib/map/Map<~lib/string/String,src/views/idaStar/boardAstar/wasm/assembly/solver/Node>#has"
        end
        if
         global.get $~lib/memory/__stack_pointer
         local.get $15
         i32.store
         global.get $~lib/memory/__stack_pointer
         local.get $15
         i32.load
         local.tee $0
         i32.store offset=56
        else
         i32.const 0
         local.set $5
         loop $for-loop|2
          local.get $5
          i32.const 4
          i32.lt_s
          if
           block $for-break2
            global.get $~lib/memory/__stack_pointer
            local.get $16
            i32.store
            block $for-continue|2
             local.get $16
             i32.load
             i32.const 0
             i32.gt_s
             if (result i32)
              global.get $~lib/memory/__stack_pointer
              local.get $16
              i32.store
              local.get $16
              i32.load offset=8
              call $src/views/idaStar/boardAstar/wasm/assembly/solver/reverseDir
              local.get $5
              i32.eq
             else
              i32.const 0
             end
             br_if $for-continue|2
             global.get $~lib/memory/__stack_pointer
             local.get $16
             i32.store
             local.get $16
             i32.load offset=4
             local.get $5
             call $src/views/idaStar/boardAstar/wasm/assembly/solver/canMove
             i32.eqz
             br_if $for-continue|2
             global.get $~lib/memory/__stack_pointer
             local.get $15
             i32.store offset=48
             global.get $~lib/memory/__stack_pointer
             local.get $15
             i32.load
             local.tee $1
             i32.store
             global.get $~lib/memory/__stack_pointer
             local.get $14
             i32.store offset=12
             local.get $1
             local.get $14
             call $src/views/idaStar/boardAstar/wasm/assembly/solver/decodeKey
             global.get $~lib/memory/__stack_pointer
             local.get $14
             i32.store
             global.get $~lib/memory/__stack_pointer
             local.get $16
             i32.store offset=12
             local.get $14
             local.get $16
             i32.load offset=4
             local.get $5
             call $src/views/idaStar/boardAstar/wasm/assembly/solver/applyDir
             local.set $17
             global.get $~lib/memory/__stack_pointer
             local.get $14
             i32.store
             global.get $~lib/memory/__stack_pointer
             local.get $14
             call $src/views/idaStar/boardAstar/wasm/assembly/solver/boardKey
             local.tee $1
             i32.store offset=68
             global.get $~lib/memory/__stack_pointer
             local.get $6
             i32.store
             global.get $~lib/memory/__stack_pointer
             local.get $1
             i32.store offset=12
             local.get $6
             local.get $1
             call $"~lib/map/Map<~lib/string/String,src/views/idaStar/boardAstar/wasm/assembly/solver/Node>#has"
             if (result i32)
              i32.const 1
             else
              global.get $~lib/memory/__stack_pointer
              local.get $2
              i32.store
              global.get $~lib/memory/__stack_pointer
              local.get $1
              i32.store offset=12
              local.get $2
              local.get $1
              call $"~lib/map/Map<~lib/string/String,src/views/idaStar/boardAstar/wasm/assembly/solver/Node>#has"
             end
             br_if $for-continue|2
             global.get $~lib/memory/__stack_pointer
             local.get $16
             i32.store
             local.get $16
             i32.load
             i32.const 1
             i32.add
             local.set $18
             global.get $~lib/memory/__stack_pointer
             local.get $14
             i32.store
             global.get $~lib/memory/__stack_pointer
             global.get $src/views/idaStar/boardAstar/wasm/assembly/solver/finishPos
             local.tee $19
             i32.store offset=12
             local.get $18
             f64.convert_i32_s
             local.get $14
             local.get $19
             i32.const 0
             call $src/views/idaStar/boardAstar/wasm/assembly/solver/manhattanTo
             f64.add
             local.set $4
             global.get $~lib/memory/__stack_pointer
             local.get $2
             i32.store
             global.get $~lib/memory/__stack_pointer
             local.get $1
             i32.store offset=12
             global.get $~lib/memory/__stack_pointer
             local.get $15
             i32.store offset=72
             global.get $~lib/memory/__stack_pointer
             local.get $15
             i32.load
             local.tee $19
             i32.store offset=52
             local.get $18
             local.get $17
             local.get $5
             local.get $19
             local.get $4
             call $src/views/idaStar/boardAstar/wasm/assembly/solver/Node#constructor
             local.set $17
             global.get $~lib/memory/__stack_pointer
             local.get $17
             i32.store offset=48
             local.get $2
             local.get $1
             local.get $17
             call $"~lib/map/Map<~lib/string/String,src/views/idaStar/boardAstar/wasm/assembly/solver/Node>#set"
             global.get $~lib/memory/__stack_pointer
             local.get $8
             i32.store
             global.get $~lib/memory/__stack_pointer
             local.get $1
             i32.store offset=48
             local.get $1
             local.get $4
             local.get $18
             call $src/views/idaStar/boardAstar/wasm/assembly/solver/HeapItem#constructor
             local.set $17
             global.get $~lib/memory/__stack_pointer
             local.get $17
             i32.store offset=12
             local.get $8
             local.get $17
             call $src/views/idaStar/boardAstar/wasm/assembly/solver/MinHeap#push
             global.get $src/views/idaStar/boardAstar/wasm/assembly/solver/expandCnt
             i32.const 1
             i32.add
             global.set $src/views/idaStar/boardAstar/wasm/assembly/solver/expandCnt
             global.get $~lib/memory/__stack_pointer
             local.get $3
             i32.store
             global.get $~lib/memory/__stack_pointer
             local.get $1
             i32.store offset=12
             local.get $3
             local.get $1
             call $"~lib/map/Map<~lib/string/String,src/views/idaStar/boardAstar/wasm/assembly/solver/Node>#has"
             if (result i32)
              i32.const 1
             else
              global.get $~lib/memory/__stack_pointer
              local.get $7
              i32.store
              global.get $~lib/memory/__stack_pointer
              local.get $1
              i32.store offset=12
              local.get $7
              local.get $1
              call $"~lib/map/Map<~lib/string/String,src/views/idaStar/boardAstar/wasm/assembly/solver/Node>#has"
             end
             if
              global.get $~lib/memory/__stack_pointer
              local.get $1
              local.tee $0
              i32.store offset=56
              br $for-break2
             end
            end
            local.get $5
            i32.const 1
            i32.add
            local.set $5
            br $for-loop|2
           end
          end
         end
        end
       end
      end
     end
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store
     local.get $0
     i32.const 20
     i32.sub
     i32.load offset=16
     i32.const 1
     i32.shr_u
     br_if $while-break|1
     global.get $~lib/memory/__stack_pointer
     local.get $9
     i32.store
     local.get $9
     call $src/views/idaStar/boardAstar/wasm/assembly/solver/MinHeap#get:size
     i32.const 0
     i32.gt_s
     if
      global.get $~lib/memory/__stack_pointer
      local.get $9
      i32.store
      global.get $~lib/memory/__stack_pointer
      local.get $9
      call $src/views/idaStar/boardAstar/wasm/assembly/solver/MinHeap#pop
      local.tee $15
      i32.store offset=76
      local.get $15
      if (result i32)
       global.get $~lib/memory/__stack_pointer
       local.get $3
       i32.store
       global.get $~lib/memory/__stack_pointer
       local.get $15
       i32.store offset=48
       global.get $~lib/memory/__stack_pointer
       local.get $15
       i32.load
       local.tee $1
       i32.store offset=12
       local.get $3
       local.get $1
       call $"~lib/map/Map<~lib/string/String,src/views/idaStar/boardAstar/wasm/assembly/solver/Node>#has"
      else
       i32.const 0
      end
      if
       global.get $~lib/memory/__stack_pointer
       local.get $3
       i32.store
       global.get $~lib/memory/__stack_pointer
       local.get $15
       i32.store offset=48
       global.get $~lib/memory/__stack_pointer
       local.get $15
       i32.load
       local.tee $1
       i32.store offset=12
       global.get $~lib/memory/__stack_pointer
       local.get $3
       local.get $1
       call $"~lib/map/Map<~lib/string/String,src/views/idaStar/boardAstar/wasm/assembly/solver/Node>#get"
       local.tee $16
       i32.store offset=80
       global.get $~lib/memory/__stack_pointer
       local.get $16
       i32.store
       local.get $16
       f64.load offset=16
       local.set $4
       global.get $~lib/memory/__stack_pointer
       local.get $15
       i32.store
       local.get $4
       local.get $15
       f64.load offset=8
       f64.eq
       if
        global.get $~lib/memory/__stack_pointer
        local.get $3
        i32.store
        global.get $~lib/memory/__stack_pointer
        local.get $15
        i32.store offset=48
        global.get $~lib/memory/__stack_pointer
        local.get $15
        i32.load
        local.tee $1
        i32.store offset=12
        local.get $3
        local.get $1
        call $"~lib/map/Map<~lib/string/String,src/views/idaStar/boardAstar/wasm/assembly/solver/Node>#delete"
        global.get $~lib/memory/__stack_pointer
        local.get $7
        i32.store
        global.get $~lib/memory/__stack_pointer
        local.get $15
        i32.store offset=52
        global.get $~lib/memory/__stack_pointer
        local.get $15
        i32.load
        local.tee $1
        i32.store offset=12
        global.get $~lib/memory/__stack_pointer
        local.get $16
        i32.store offset=48
        local.get $7
        local.get $1
        local.get $16
        call $"~lib/map/Map<~lib/string/String,src/views/idaStar/boardAstar/wasm/assembly/solver/Node>#set"
        global.get $~lib/memory/__stack_pointer
        local.get $15
        i32.store offset=48
        global.get $~lib/memory/__stack_pointer
        local.get $15
        i32.load
        local.tee $1
        i32.store
        global.get $~lib/memory/__stack_pointer
        local.get $10
        i32.store offset=12
        local.get $1
        local.get $10
        call $~lib/string/String.__eq
        if (result i32)
         i32.const 1
        else
         global.get $~lib/memory/__stack_pointer
         local.get $2
         i32.store
         global.get $~lib/memory/__stack_pointer
         local.get $15
         i32.store offset=48
         global.get $~lib/memory/__stack_pointer
         local.get $15
         i32.load
         local.tee $1
         i32.store offset=12
         local.get $2
         local.get $1
         call $"~lib/map/Map<~lib/string/String,src/views/idaStar/boardAstar/wasm/assembly/solver/Node>#has"
        end
        if (result i32)
         i32.const 1
        else
         global.get $~lib/memory/__stack_pointer
         local.get $6
         i32.store
         global.get $~lib/memory/__stack_pointer
         local.get $15
         i32.store offset=48
         global.get $~lib/memory/__stack_pointer
         local.get $15
         i32.load
         local.tee $1
         i32.store offset=12
         local.get $6
         local.get $1
         call $"~lib/map/Map<~lib/string/String,src/views/idaStar/boardAstar/wasm/assembly/solver/Node>#has"
        end
        if
         global.get $~lib/memory/__stack_pointer
         local.get $15
         i32.store
         global.get $~lib/memory/__stack_pointer
         local.get $15
         i32.load
         local.tee $0
         i32.store offset=56
        else
         i32.const 0
         local.set $5
         loop $for-loop|3
          local.get $5
          i32.const 4
          i32.lt_s
          if
           block $for-break3
            global.get $~lib/memory/__stack_pointer
            local.get $16
            i32.store
            block $for-continue|3
             local.get $16
             i32.load
             i32.const 0
             i32.gt_s
             if (result i32)
              global.get $~lib/memory/__stack_pointer
              local.get $16
              i32.store
              local.get $16
              i32.load offset=8
              call $src/views/idaStar/boardAstar/wasm/assembly/solver/reverseDir
              local.get $5
              i32.eq
             else
              i32.const 0
             end
             br_if $for-continue|3
             global.get $~lib/memory/__stack_pointer
             local.get $16
             i32.store
             local.get $16
             i32.load offset=4
             local.get $5
             call $src/views/idaStar/boardAstar/wasm/assembly/solver/canMove
             i32.eqz
             br_if $for-continue|3
             global.get $~lib/memory/__stack_pointer
             local.get $15
             i32.store offset=48
             global.get $~lib/memory/__stack_pointer
             local.get $15
             i32.load
             local.tee $1
             i32.store
             global.get $~lib/memory/__stack_pointer
             local.get $14
             i32.store offset=12
             local.get $1
             local.get $14
             call $src/views/idaStar/boardAstar/wasm/assembly/solver/decodeKey
             global.get $~lib/memory/__stack_pointer
             local.get $14
             i32.store
             global.get $~lib/memory/__stack_pointer
             local.get $16
             i32.store offset=12
             local.get $14
             local.get $16
             i32.load offset=4
             local.get $5
             call $src/views/idaStar/boardAstar/wasm/assembly/solver/applyDir
             local.set $17
             global.get $~lib/memory/__stack_pointer
             local.get $14
             i32.store
             global.get $~lib/memory/__stack_pointer
             local.get $14
             call $src/views/idaStar/boardAstar/wasm/assembly/solver/boardKey
             local.tee $1
             i32.store offset=84
             global.get $~lib/memory/__stack_pointer
             local.get $7
             i32.store
             global.get $~lib/memory/__stack_pointer
             local.get $1
             i32.store offset=12
             local.get $7
             local.get $1
             call $"~lib/map/Map<~lib/string/String,src/views/idaStar/boardAstar/wasm/assembly/solver/Node>#has"
             if (result i32)
              i32.const 1
             else
              global.get $~lib/memory/__stack_pointer
              local.get $3
              i32.store
              global.get $~lib/memory/__stack_pointer
              local.get $1
              i32.store offset=12
              local.get $3
              local.get $1
              call $"~lib/map/Map<~lib/string/String,src/views/idaStar/boardAstar/wasm/assembly/solver/Node>#has"
             end
             br_if $for-continue|3
             global.get $~lib/memory/__stack_pointer
             local.get $16
             i32.store
             local.get $16
             i32.load
             i32.const 1
             i32.add
             local.set $18
             global.get $~lib/memory/__stack_pointer
             local.get $14
             i32.store
             global.get $~lib/memory/__stack_pointer
             local.get $12
             i32.store offset=12
             local.get $18
             f64.convert_i32_s
             local.get $14
             local.get $12
             i32.const 0
             call $src/views/idaStar/boardAstar/wasm/assembly/solver/manhattanTo
             f64.add
             local.set $4
             global.get $~lib/memory/__stack_pointer
             local.get $3
             i32.store
             global.get $~lib/memory/__stack_pointer
             local.get $1
             i32.store offset=12
             global.get $~lib/memory/__stack_pointer
             local.get $15
             i32.store offset=72
             global.get $~lib/memory/__stack_pointer
             local.get $15
             i32.load
             local.tee $19
             i32.store offset=52
             local.get $18
             local.get $17
             local.get $5
             local.get $19
             local.get $4
             call $src/views/idaStar/boardAstar/wasm/assembly/solver/Node#constructor
             local.set $17
             global.get $~lib/memory/__stack_pointer
             local.get $17
             i32.store offset=48
             local.get $3
             local.get $1
             local.get $17
             call $"~lib/map/Map<~lib/string/String,src/views/idaStar/boardAstar/wasm/assembly/solver/Node>#set"
             global.get $~lib/memory/__stack_pointer
             local.get $9
             i32.store
             global.get $~lib/memory/__stack_pointer
             local.get $1
             i32.store offset=48
             local.get $1
             local.get $4
             local.get $18
             call $src/views/idaStar/boardAstar/wasm/assembly/solver/HeapItem#constructor
             local.set $17
             global.get $~lib/memory/__stack_pointer
             local.get $17
             i32.store offset=12
             local.get $9
             local.get $17
             call $src/views/idaStar/boardAstar/wasm/assembly/solver/MinHeap#push
             global.get $src/views/idaStar/boardAstar/wasm/assembly/solver/expandCnt
             i32.const 1
             i32.add
             global.set $src/views/idaStar/boardAstar/wasm/assembly/solver/expandCnt
             global.get $~lib/memory/__stack_pointer
             local.get $2
             i32.store
             global.get $~lib/memory/__stack_pointer
             local.get $1
             i32.store offset=12
             local.get $2
             local.get $1
             call $"~lib/map/Map<~lib/string/String,src/views/idaStar/boardAstar/wasm/assembly/solver/Node>#has"
             if (result i32)
              i32.const 1
             else
              global.get $~lib/memory/__stack_pointer
              local.get $6
              i32.store
              global.get $~lib/memory/__stack_pointer
              local.get $1
              i32.store offset=12
              local.get $6
              local.get $1
              call $"~lib/map/Map<~lib/string/String,src/views/idaStar/boardAstar/wasm/assembly/solver/Node>#has"
             end
             if
              global.get $~lib/memory/__stack_pointer
              local.get $1
              local.tee $0
              i32.store offset=56
              br $for-break3
             end
            end
            local.get $5
            i32.const 1
            i32.add
            local.set $5
            br $for-loop|3
           end
          end
         end
        end
       end
      end
     end
     br $while-continue|1
    end
   end
  end
  global.get $~lib/memory/__stack_pointer
  local.get $2
  i32.store
  global.get $src/views/idaStar/boardAstar/wasm/assembly/solver/stateCntTotal
  local.set $1
  local.get $2
  call $"~lib/map/Map<~lib/string/String,src/views/idaStar/boardAstar/wasm/assembly/solver/Node>#get:size"
  local.set $5
  global.get $~lib/memory/__stack_pointer
  local.get $6
  i32.store
  local.get $6
  call $"~lib/map/Map<~lib/string/String,src/views/idaStar/boardAstar/wasm/assembly/solver/Node>#get:size"
  local.get $5
  i32.add
  local.set $5
  global.get $~lib/memory/__stack_pointer
  local.get $3
  i32.store
  local.get $3
  call $"~lib/map/Map<~lib/string/String,src/views/idaStar/boardAstar/wasm/assembly/solver/Node>#get:size"
  local.get $5
  i32.add
  local.set $5
  global.get $~lib/memory/__stack_pointer
  local.get $7
  i32.store
  local.get $1
  local.get $7
  call $"~lib/map/Map<~lib/string/String,src/views/idaStar/boardAstar/wasm/assembly/solver/Node>#get:size"
  local.get $5
  i32.add
  i32.add
  global.set $src/views/idaStar/boardAstar/wasm/assembly/solver/stateCntTotal
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $0
  i32.const 20
  i32.sub
  i32.load offset=16
  i32.const 1
  i32.shr_u
  i32.eqz
  if
   i32.const 1
   global.set $src/views/idaStar/boardAstar/wasm/assembly/solver/lastError
   global.get $~lib/memory/__stack_pointer
   i32.const 88
   i32.add
   global.set $~lib/memory/__stack_pointer
   i32.const -1
   return
  end
  global.get $~lib/memory/__stack_pointer
  local.get $6
  i32.store offset=48
  global.get $~lib/memory/__stack_pointer
  local.get $2
  i32.store offset=52
  local.get $6
  local.get $2
  call $src/views/idaStar/boardAstar/wasm/assembly/solver/mergeMaps
  local.set $1
  global.get $~lib/memory/__stack_pointer
  local.get $1
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store offset=12
  local.get $1
  local.get $0
  i32.const 0
  call $src/views/idaStar/boardAstar/wasm/assembly/solver/appendPath
  global.get $~lib/memory/__stack_pointer
  local.get $7
  i32.store offset=48
  global.get $~lib/memory/__stack_pointer
  local.get $3
  i32.store offset=52
  local.get $7
  local.get $3
  call $src/views/idaStar/boardAstar/wasm/assembly/solver/mergeMaps
  local.set $1
  global.get $~lib/memory/__stack_pointer
  local.get $1
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store offset=12
  local.get $1
  local.get $0
  i32.const 1
  call $src/views/idaStar/boardAstar/wasm/assembly/solver/appendPath
  global.get $~lib/memory/__stack_pointer
  i32.const 88
  i32.add
  global.set $~lib/memory/__stack_pointer
  global.get $src/views/idaStar/boardAstar/wasm/assembly/solver/outActionLen
  local.get $13
  i32.sub
 )
 (func $src/views/idaStar/boardAstar/wasm/assembly/solver/execAll (result i32)
  (local $0 i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 f64)
  (local $7 i32)
  (local $8 i32)
  (local $9 i32)
  (local $10 i32)
  (local $11 i32)
  (local $12 i32)
  (local $13 i32)
  (local $14 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 108
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.const 108
  memory.fill
  i32.const 0
  global.set $src/views/idaStar/boardAstar/wasm/assembly/solver/lastError
  i32.const 0
  global.set $src/views/idaStar/boardAstar/wasm/assembly/solver/outActionLen
  i32.const 0
  global.set $src/views/idaStar/boardAstar/wasm/assembly/solver/stateCntTotal
  i32.const 0
  global.set $src/views/idaStar/boardAstar/wasm/assembly/solver/expandCnt
  i32.const 0
  global.set $src/views/idaStar/boardAstar/wasm/assembly/solver/focusLen
  global.get $~lib/memory/__stack_pointer
  global.get $src/views/idaStar/boardAstar/wasm/assembly/solver/curList
  local.tee $2
  i32.store
  global.get $~lib/memory/__stack_pointer
  global.get $src/views/idaStar/boardAstar/wasm/assembly/solver/startList
  local.tee $4
  i32.store offset=4
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store
  loop $for-loop|0
   local.get $0
   global.get $src/views/idaStar/boardAstar/wasm/assembly/solver/n
   i32.lt_s
   if
    global.get $~lib/memory/__stack_pointer
    local.get $2
    i32.store
    global.get $~lib/memory/__stack_pointer
    local.get $4
    i32.store offset=4
    local.get $2
    local.get $0
    local.get $4
    local.get $0
    call $~lib/staticarray/StaticArray<u8>#__get
    call $~lib/staticarray/StaticArray<u8>#__set
    local.get $0
    i32.const 1
    i32.add
    local.set $0
    br $for-loop|0
   end
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.add
  global.set $~lib/memory/__stack_pointer
  call $src/views/idaStar/boardAstar/wasm/assembly/solver/buildWindows
  global.get $src/views/idaStar/boardAstar/wasm/assembly/solver/winWeight
  local.set $6
  block $folding-inner1 (result i32)
   block $folding-inner0
    loop $for-loop|00
     local.get $1
     global.get $src/views/idaStar/boardAstar/wasm/assembly/solver/winCount
     i32.lt_s
     if
      global.get $~lib/memory/__stack_pointer
      global.get $src/views/idaStar/boardAstar/wasm/assembly/solver/winLefts
      local.tee $0
      i32.store
      local.get $0
      local.get $1
      call $~lib/staticarray/StaticArray<i32>#__get
      local.set $10
      global.get $~lib/memory/__stack_pointer
      global.get $src/views/idaStar/boardAstar/wasm/assembly/solver/winTops
      local.tee $0
      i32.store
      local.get $0
      local.get $1
      call $~lib/staticarray/StaticArray<i32>#__get
      local.set $11
      global.get $~lib/memory/__stack_pointer
      global.get $src/views/idaStar/boardAstar/wasm/assembly/solver/winWs
      local.tee $0
      i32.store
      local.get $0
      local.get $1
      call $~lib/staticarray/StaticArray<i32>#__get
      local.set $14
      global.get $~lib/memory/__stack_pointer
      global.get $src/views/idaStar/boardAstar/wasm/assembly/solver/winHs
      local.tee $0
      i32.store
      local.get $10
      local.get $11
      local.get $14
      local.get $0
      local.get $1
      call $~lib/staticarray/StaticArray<i32>#__get
      local.tee $4
      call $src/views/idaStar/boardAstar/wasm/assembly/solver/collectWindowNums
      local.get $6
      global.set $src/views/idaStar/boardAstar/wasm/assembly/solver/winWeight
      global.get $~lib/memory/__stack_pointer
      global.get $src/views/idaStar/boardAstar/wasm/assembly/solver/curList
      local.tee $0
      i32.store
      block $for-continue|0 (result i32)
       local.get $0
       call $src/views/idaStar/boardAstar/wasm/assembly/solver/isFocusDone
       if
        global.get $~lib/memory/__stack_pointer
        i32.const 1568
        i32.store offset=52
        local.get $10
        call $~lib/util/number/itoa32
        local.set $0
        global.get $~lib/memory/__stack_pointer
        local.get $0
        i32.store offset=56
        i32.const 1568
        local.get $0
        call $~lib/string/String.__concat
        local.set $0
        global.get $~lib/memory/__stack_pointer
        local.get $0
        i32.store offset=44
        global.get $~lib/memory/__stack_pointer
        i32.const 1952
        i32.store offset=48
        local.get $0
        i32.const 1952
        call $~lib/string/String.__concat
        local.set $0
        global.get $~lib/memory/__stack_pointer
        local.get $0
        i32.store offset=36
        local.get $11
        call $~lib/util/number/itoa32
        local.set $2
        global.get $~lib/memory/__stack_pointer
        local.get $2
        i32.store offset=40
        local.get $0
        local.get $2
        call $~lib/string/String.__concat
        local.set $0
        global.get $~lib/memory/__stack_pointer
        local.get $0
        i32.store offset=28
        global.get $~lib/memory/__stack_pointer
        i32.const 1952
        i32.store offset=32
        local.get $0
        i32.const 1952
        call $~lib/string/String.__concat
        local.set $0
        global.get $~lib/memory/__stack_pointer
        local.get $0
        i32.store offset=20
        local.get $14
        call $~lib/util/number/itoa32
        local.set $2
        global.get $~lib/memory/__stack_pointer
        local.get $2
        i32.store offset=24
        local.get $0
        local.get $2
        call $~lib/string/String.__concat
        local.set $0
        global.get $~lib/memory/__stack_pointer
        local.get $0
        i32.store offset=12
        global.get $~lib/memory/__stack_pointer
        i32.const 1984
        i32.store offset=16
        local.get $0
        i32.const 1984
        call $~lib/string/String.__concat
        local.set $0
        global.get $~lib/memory/__stack_pointer
        local.get $0
        i32.store offset=4
        local.get $4
        call $~lib/util/number/itoa32
        br $for-continue|0
       end
       global.get $~lib/memory/__stack_pointer
       i32.const 2016
       i32.store offset=100
       local.get $1
       i32.const 1
       i32.add
       call $~lib/util/number/itoa32
       local.set $0
       global.get $~lib/memory/__stack_pointer
       local.get $0
       i32.store offset=104
       i32.const 2016
       local.get $0
       call $~lib/string/String.__concat
       local.set $0
       global.get $~lib/memory/__stack_pointer
       local.get $0
       i32.store offset=92
       global.get $~lib/memory/__stack_pointer
       i32.const 2048
       i32.store offset=96
       local.get $0
       i32.const 2048
       call $~lib/string/String.__concat
       local.set $0
       global.get $~lib/memory/__stack_pointer
       local.get $0
       i32.store offset=84
       global.get $src/views/idaStar/boardAstar/wasm/assembly/solver/winCount
       call $~lib/util/number/itoa32
       local.set $2
       global.get $~lib/memory/__stack_pointer
       local.get $2
       i32.store offset=88
       local.get $0
       local.get $2
       call $~lib/string/String.__concat
       local.set $0
       global.get $~lib/memory/__stack_pointer
       local.get $0
       i32.store offset=76
       global.get $~lib/memory/__stack_pointer
       i32.const 2080
       i32.store offset=80
       local.get $0
       i32.const 2080
       call $~lib/string/String.__concat
       local.set $0
       global.get $~lib/memory/__stack_pointer
       local.get $0
       i32.store offset=68
       local.get $10
       call $~lib/util/number/itoa32
       local.set $2
       global.get $~lib/memory/__stack_pointer
       local.get $2
       i32.store offset=72
       local.get $0
       local.get $2
       call $~lib/string/String.__concat
       local.set $0
       global.get $~lib/memory/__stack_pointer
       local.get $0
       i32.store offset=60
       global.get $~lib/memory/__stack_pointer
       i32.const 1952
       i32.store offset=64
       local.get $0
       i32.const 1952
       call $~lib/string/String.__concat
       local.set $0
       global.get $~lib/memory/__stack_pointer
       local.get $0
       i32.store offset=52
       local.get $11
       call $~lib/util/number/itoa32
       local.set $2
       global.get $~lib/memory/__stack_pointer
       local.get $2
       i32.store offset=56
       local.get $0
       local.get $2
       call $~lib/string/String.__concat
       local.set $0
       global.get $~lib/memory/__stack_pointer
       local.get $0
       i32.store offset=44
       global.get $~lib/memory/__stack_pointer
       i32.const 1952
       i32.store offset=48
       local.get $0
       i32.const 1952
       call $~lib/string/String.__concat
       local.set $0
       global.get $~lib/memory/__stack_pointer
       local.get $0
       i32.store offset=36
       local.get $14
       call $~lib/util/number/itoa32
       local.set $2
       global.get $~lib/memory/__stack_pointer
       local.get $2
       i32.store offset=40
       local.get $0
       local.get $2
       call $~lib/string/String.__concat
       local.set $0
       global.get $~lib/memory/__stack_pointer
       local.get $0
       i32.store offset=28
       global.get $~lib/memory/__stack_pointer
       i32.const 1984
       i32.store offset=32
       local.get $0
       i32.const 1984
       call $~lib/string/String.__concat
       local.set $0
       global.get $~lib/memory/__stack_pointer
       local.get $0
       i32.store offset=20
       local.get $4
       call $~lib/util/number/itoa32
       local.set $2
       global.get $~lib/memory/__stack_pointer
       local.get $2
       i32.store offset=24
       local.get $0
       local.get $2
       call $~lib/string/String.__concat
       local.set $0
       global.get $~lib/memory/__stack_pointer
       local.get $0
       i32.store offset=12
       global.get $~lib/memory/__stack_pointer
       i32.const 2080
       i32.store offset=16
       local.get $0
       i32.const 2080
       call $~lib/string/String.__concat
       local.set $0
       global.get $~lib/memory/__stack_pointer
       local.get $0
       i32.store offset=4
       global.get $src/views/idaStar/boardAstar/wasm/assembly/solver/focusLen
       call $~lib/util/number/itoa32
       local.set $2
       global.get $~lib/memory/__stack_pointer
       local.get $2
       i32.store offset=8
       local.get $0
       local.get $2
       call $~lib/string/String.__concat
       local.set $0
       global.get $~lib/memory/__stack_pointer
       local.get $0
       i32.store
       local.get $0
       call $src/views/idaStar/boardAstar/wasm/assembly/solver/setProgress
       global.get $src/views/idaStar/boardAstar/wasm/assembly/solver/outActionLen
       local.set $12
       call $src/views/idaStar/boardAstar/wasm/assembly/solver/solveWindow
       local.tee $13
       i32.const 0
       i32.lt_s
       br_if $folding-inner0
       local.get $13
       i32.const 0
       i32.gt_s
       if
        i32.const 0
        local.set $0
        global.get $~lib/memory/__stack_pointer
        i32.const 8
        i32.sub
        global.set $~lib/memory/__stack_pointer
        call $~stack_check
        global.get $~lib/memory/__stack_pointer
        i64.const 0
        i64.store
        global.get $~lib/memory/__stack_pointer
        global.get $src/views/idaStar/boardAstar/wasm/assembly/solver/curList
        local.tee $2
        i32.store
        local.get $2
        call $src/views/idaStar/boardAstar/wasm/assembly/solver/findEmpty
        local.set $2
        loop $for-loop|01
         local.get $0
         local.get $13
         i32.lt_s
         if
          global.get $~lib/memory/__stack_pointer
          global.get $src/views/idaStar/boardAstar/wasm/assembly/solver/curList
          local.tee $7
          i32.store
          global.get $~lib/memory/__stack_pointer
          global.get $src/views/idaStar/boardAstar/wasm/assembly/solver/outActions
          local.tee $8
          i32.store offset=4
          local.get $7
          local.get $2
          local.get $8
          local.get $0
          local.get $12
          i32.add
          call $~lib/staticarray/StaticArray<u8>#__get
          call $src/views/idaStar/boardAstar/wasm/assembly/solver/applyDir
          local.set $2
          local.get $0
          i32.const 1
          i32.add
          local.set $0
          br $for-loop|01
         end
        end
        global.get $~lib/memory/__stack_pointer
        i32.const 8
        i32.add
        global.set $~lib/memory/__stack_pointer
       end
       global.get $~lib/memory/__stack_pointer
       i32.const 2544
       i32.store offset=84
       local.get $10
       call $~lib/util/number/itoa32
       local.set $0
       global.get $~lib/memory/__stack_pointer
       local.get $0
       i32.store offset=88
       i32.const 2544
       local.get $0
       call $~lib/string/String.__concat
       local.set $0
       global.get $~lib/memory/__stack_pointer
       local.get $0
       i32.store offset=76
       global.get $~lib/memory/__stack_pointer
       i32.const 1952
       i32.store offset=80
       local.get $0
       i32.const 1952
       call $~lib/string/String.__concat
       local.set $0
       global.get $~lib/memory/__stack_pointer
       local.get $0
       i32.store offset=68
       local.get $11
       call $~lib/util/number/itoa32
       local.set $2
       global.get $~lib/memory/__stack_pointer
       local.get $2
       i32.store offset=72
       local.get $0
       local.get $2
       call $~lib/string/String.__concat
       local.set $0
       global.get $~lib/memory/__stack_pointer
       local.get $0
       i32.store offset=60
       global.get $~lib/memory/__stack_pointer
       i32.const 1952
       i32.store offset=64
       local.get $0
       i32.const 1952
       call $~lib/string/String.__concat
       local.set $0
       global.get $~lib/memory/__stack_pointer
       local.get $0
       i32.store offset=52
       local.get $14
       call $~lib/util/number/itoa32
       local.set $2
       global.get $~lib/memory/__stack_pointer
       local.get $2
       i32.store offset=56
       local.get $0
       local.get $2
       call $~lib/string/String.__concat
       local.set $0
       global.get $~lib/memory/__stack_pointer
       local.get $0
       i32.store offset=44
       global.get $~lib/memory/__stack_pointer
       i32.const 1984
       i32.store offset=48
       local.get $0
       i32.const 1984
       call $~lib/string/String.__concat
       local.set $0
       global.get $~lib/memory/__stack_pointer
       local.get $0
       i32.store offset=36
       local.get $4
       call $~lib/util/number/itoa32
       local.set $2
       global.get $~lib/memory/__stack_pointer
       local.get $2
       i32.store offset=40
       local.get $0
       local.get $2
       call $~lib/string/String.__concat
       local.set $0
       global.get $~lib/memory/__stack_pointer
       local.get $0
       i32.store offset=28
       global.get $~lib/memory/__stack_pointer
       i32.const 2080
       i32.store offset=32
       local.get $0
       i32.const 2080
       call $~lib/string/String.__concat
       local.set $0
       global.get $~lib/memory/__stack_pointer
       local.get $0
       i32.store offset=20
       local.get $13
       call $~lib/util/number/itoa32
       local.set $2
       global.get $~lib/memory/__stack_pointer
       local.get $2
       i32.store offset=24
       local.get $0
       local.get $2
       call $~lib/string/String.__concat
       local.set $0
       global.get $~lib/memory/__stack_pointer
       local.get $0
       i32.store offset=12
       global.get $~lib/memory/__stack_pointer
       i32.const 2080
       i32.store offset=16
       local.get $0
       i32.const 2080
       call $~lib/string/String.__concat
       local.set $0
       global.get $~lib/memory/__stack_pointer
       local.get $0
       i32.store offset=4
       global.get $src/views/idaStar/boardAstar/wasm/assembly/solver/outActionLen
       call $~lib/util/number/itoa32
      end
      local.set $2
      global.get $~lib/memory/__stack_pointer
      local.get $2
      i32.store offset=8
      local.get $0
      local.get $2
      call $~lib/string/String.__concat
      local.set $0
      global.get $~lib/memory/__stack_pointer
      local.get $0
      i32.store
      local.get $0
      call $src/views/idaStar/boardAstar/wasm/assembly/solver/setProgress
      local.get $1
      i32.const 1
      i32.add
      local.set $1
      br $for-loop|00
     end
    end
    loop $for-loop|1
     local.get $3
     global.get $src/views/idaStar/boardAstar/wasm/assembly/solver/n
     i32.lt_s
     if
      block $for-break1
       global.get $~lib/memory/__stack_pointer
       global.get $src/views/idaStar/boardAstar/wasm/assembly/solver/curList
       local.tee $0
       i32.store
       local.get $0
       local.get $3
       call $~lib/staticarray/StaticArray<u8>#__get
       local.set $0
       global.get $~lib/memory/__stack_pointer
       global.get $src/views/idaStar/boardAstar/wasm/assembly/solver/finish
       local.tee $1
       i32.store
       local.get $1
       local.get $3
       call $~lib/staticarray/StaticArray<u8>#__get
       local.get $0
       i32.ne
       if
        i32.const 1
        local.set $9
        br $for-break1
       end
       local.get $3
       i32.const 1
       i32.add
       local.set $3
       br $for-loop|1
      end
     end
    end
    local.get $9
    if
     global.get $~lib/memory/__stack_pointer
     i32.const 2592
     i32.store
     i32.const 2592
     call $src/views/idaStar/boardAstar/wasm/assembly/solver/setProgress
     f64.const 1
     global.set $src/views/idaStar/boardAstar/wasm/assembly/solver/winWeight
     global.get $~lib/memory/__stack_pointer
     i32.const 4
     i32.sub
     global.set $~lib/memory/__stack_pointer
     call $~stack_check
     global.get $~lib/memory/__stack_pointer
     i32.const 0
     i32.store
     i32.const 0
     global.set $src/views/idaStar/boardAstar/wasm/assembly/solver/focusLen
     loop $for-loop|02
      local.get $5
      global.get $src/views/idaStar/boardAstar/wasm/assembly/solver/n
      i32.lt_s
      if
       global.get $~lib/memory/__stack_pointer
       global.get $src/views/idaStar/boardAstar/wasm/assembly/solver/finish
       local.tee $0
       i32.store
       local.get $0
       local.get $5
       call $~lib/staticarray/StaticArray<u8>#__get
       local.tee $0
       global.get $src/views/idaStar/boardAstar/wasm/assembly/solver/emptyNum
       i32.ne
       if
        global.get $~lib/memory/__stack_pointer
        global.get $src/views/idaStar/boardAstar/wasm/assembly/solver/focusArr
        local.tee $1
        i32.store
        global.get $src/views/idaStar/boardAstar/wasm/assembly/solver/focusLen
        local.tee $2
        i32.const 1
        i32.add
        global.set $src/views/idaStar/boardAstar/wasm/assembly/solver/focusLen
        local.get $1
        local.get $2
        local.get $0
        call $~lib/staticarray/StaticArray<i32>#__set
       end
       local.get $5
       i32.const 1
       i32.add
       local.set $5
       br $for-loop|02
      end
     end
     global.get $~lib/memory/__stack_pointer
     i32.const 4
     i32.add
     global.set $~lib/memory/__stack_pointer
     call $src/views/idaStar/boardAstar/wasm/assembly/solver/solveBi
     local.set $0
     local.get $6
     global.set $src/views/idaStar/boardAstar/wasm/assembly/solver/winWeight
     local.get $0
     i32.const 0
     i32.lt_s
     br_if $folding-inner0
    end
    global.get $~lib/memory/__stack_pointer
    i32.const 2624
    i32.store offset=52
    global.get $src/views/idaStar/boardAstar/wasm/assembly/solver/outActionLen
    call $~lib/util/number/itoa32
    local.set $0
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store offset=56
    i32.const 2624
    local.get $0
    call $~lib/string/String.__concat
    local.set $0
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store offset=44
    global.get $~lib/memory/__stack_pointer
    i32.const 2080
    i32.store offset=48
    local.get $0
    i32.const 2080
    call $~lib/string/String.__concat
    local.set $0
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store offset=36
    global.get $src/views/idaStar/boardAstar/wasm/assembly/solver/stateCntTotal
    call $~lib/util/number/itoa32
    local.set $1
    global.get $~lib/memory/__stack_pointer
    local.get $1
    i32.store offset=40
    local.get $0
    local.get $1
    call $~lib/string/String.__concat
    local.set $0
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store offset=28
    global.get $~lib/memory/__stack_pointer
    i32.const 2080
    i32.store offset=32
    local.get $0
    i32.const 2080
    call $~lib/string/String.__concat
    local.set $0
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store offset=20
    global.get $src/views/idaStar/boardAstar/wasm/assembly/solver/winCount
    call $~lib/util/number/itoa32
    local.set $1
    global.get $~lib/memory/__stack_pointer
    local.get $1
    i32.store offset=24
    local.get $0
    local.get $1
    call $~lib/string/String.__concat
    local.set $0
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store offset=12
    global.get $~lib/memory/__stack_pointer
    i32.const 2080
    i32.store offset=16
    local.get $0
    i32.const 2080
    call $~lib/string/String.__concat
    local.set $0
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store offset=4
    global.get $src/views/idaStar/boardAstar/wasm/assembly/solver/expandCnt
    call $~lib/util/number/itoa32
    local.set $1
    global.get $~lib/memory/__stack_pointer
    local.get $1
    i32.store offset=8
    local.get $0
    local.get $1
    call $~lib/string/String.__concat
    local.set $0
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store
    local.get $0
    call $src/views/idaStar/boardAstar/wasm/assembly/solver/setProgress
    global.get $src/views/idaStar/boardAstar/wasm/assembly/solver/outActionLen
    br $folding-inner1
   end
   i32.const -1
  end
  local.set $0
  global.get $~lib/memory/__stack_pointer
  i32.const 108
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $~lib/staticarray/StaticArray<u8>#constructor (param $0 i32) (result i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  local.get $0
  i32.const 1073741820
  i32.gt_u
  if
   i32.const 1056
   i32.const 1104
   i32.const 51
   i32.const 60
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.const 4
  call $~lib/rt/itcms/__new
  local.tee $0
  i32.store
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $~lib/staticarray/StaticArray<i32>#constructor (param $0 i32) (result i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  local.get $0
  i32.const 268435455
  i32.gt_u
  if
   i32.const 1056
   i32.const 1104
   i32.const 51
   i32.const 60
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.const 2
  i32.shl
  i32.const 5
  call $~lib/rt/itcms/__new
  local.tee $0
  i32.store
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $~lib/util/number/itoa32 (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  block $folding-inner0
   local.get $0
   i32.eqz
   if
    i32.const 1792
    local.set $1
    br $folding-inner0
   end
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   local.get $0
   i32.sub
   local.get $0
   local.get $0
   i32.const 31
   i32.shr_u
   i32.const 1
   i32.shl
   local.tee $2
   select
   local.tee $0
   i32.const 100000
   i32.lt_u
   if (result i32)
    local.get $0
    i32.const 10
    i32.ge_u
    i32.const 1
    i32.add
    local.get $0
    i32.const 10000
    i32.ge_u
    i32.const 3
    i32.add
    local.get $0
    i32.const 1000
    i32.ge_u
    i32.add
    local.get $0
    i32.const 100
    i32.lt_u
    select
   else
    local.get $0
    i32.const 1000000
    i32.ge_u
    i32.const 6
    i32.add
    local.get $0
    i32.const 1000000000
    i32.ge_u
    i32.const 8
    i32.add
    local.get $0
    i32.const 100000000
    i32.ge_u
    i32.add
    local.get $0
    i32.const 10000000
    i32.lt_u
    select
   end
   local.tee $3
   i32.const 1
   i32.shl
   local.get $2
   i32.add
   i32.const 2
   call $~lib/rt/itcms/__new
   local.tee $1
   i32.store
   local.get $1
   local.get $2
   i32.add
   local.set $4
   loop $do-loop|0
    local.get $4
    local.get $3
    i32.const 1
    i32.sub
    local.tee $3
    i32.const 1
    i32.shl
    i32.add
    local.get $0
    i32.const 10
    i32.rem_u
    i32.const 48
    i32.add
    i32.store16
    local.get $0
    i32.const 10
    i32.div_u
    local.tee $0
    br_if $do-loop|0
   end
   local.get $2
   if
    local.get $1
    i32.const 45
    i32.store16
   end
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $1
 )
 (func $~lib/arraybuffer/ArrayBuffer#constructor (param $0 i32) (result i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  local.get $0
  i32.const 1073741820
  i32.gt_u
  if
   i32.const 1056
   i32.const 2112
   i32.const 52
   i32.const 43
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.const 1
  call $~lib/rt/itcms/__new
  local.tee $0
  i32.store
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
)
