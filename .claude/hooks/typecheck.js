// Stop hook: runs `tsc --noEmit` when TS/JS files under src/ changed this turn.
// On errors it exits with code 2 so Claude receives them and keeps working.
const { spawnSync } = require('child_process')
const fs = require('fs')
const os = require('os')
const path = require('path')

let input = ''
process.stdin.on('data', chunk => (input += chunk))
process.stdin.on('end', () => {
	let data
	try {
		data = JSON.parse(input)
	} catch {
		return
	}
	const marker = path.join(os.tmpdir(), `claude-tsc-dirty-${data.session_id}`)
	if (!fs.existsSync(marker)) return

	const projectDir = process.env.CLAUDE_PROJECT_DIR || data.cwd
	const tsc = path.join(projectDir, 'node_modules', 'typescript', 'bin', 'tsc')
	const result = spawnSync(process.execPath, [tsc, '--noEmit', '--pretty', 'false'], {
		cwd: projectDir,
		encoding: 'utf8'
	})

	if (result.status === 0) {
		fs.unlinkSync(marker)
		return
	}

	// Already continued once because of this hook: don't loop forever, let the user decide.
	if (data.stop_hook_active) {
		fs.unlinkSync(marker)
		return
	}

	const output = `${result.stdout || ''}${result.stderr || ''}`
		.trim()
		.split('\n')
		.slice(0, 40)
		.join('\n')
	process.stderr.write(
		`TypeScript errors after your changes (npx tsc --noEmit):\n${output}\nFix them before finishing.`
	)
	process.exit(2)
})
