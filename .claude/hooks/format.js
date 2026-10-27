// PostToolUse hook: formats edited files with the project's Prettier config
// and marks the session as needing a type check (consumed by typecheck.js).
const { execFileSync } = require('child_process')
const fs = require('fs')
const os = require('os')
const path = require('path')

const FORMATTABLE = /\.(tsx?|jsx?|json|css|md|html)$/i
const TYPED = /\.(tsx?|jsx?)$/i

let input = ''
process.stdin.on('data', chunk => (input += chunk))
process.stdin.on('end', () => {
	let data
	try {
		data = JSON.parse(input)
	} catch {
		return
	}
	const file = data.tool_input && data.tool_input.file_path
	const projectDir = process.env.CLAUDE_PROJECT_DIR || data.cwd
	if (!file || !projectDir) return

	const rel = path.relative(projectDir, path.resolve(file))
	if (rel.startsWith('..') || path.isAbsolute(rel)) return
	if (/^(node_modules|build)[\\/]/.test(rel) || /(^|[\\/])yarn\.lock$/.test(rel)) return

	if (FORMATTABLE.test(file)) {
		const prettier = path.join(projectDir, 'node_modules', 'prettier', 'bin-prettier.js')
		try {
			execFileSync(process.execPath, [prettier, '--write', file], {
				cwd: projectDir,
				stdio: 'ignore'
			})
		} catch {
			// Unparseable file or missing prettier: leave it to tsc / the user.
		}
	}

	if (TYPED.test(file) && rel.startsWith('src')) {
		fs.writeFileSync(path.join(os.tmpdir(), `claude-tsc-dirty-${data.session_id}`), '')
	}
})
