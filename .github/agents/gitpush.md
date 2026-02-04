# Git Push Workflow (Subagent)

This workflow automates the process of pushing local changes to a remote Git repository. It is designed to be used as a subagent in automation or CI/CD scenarios.

## Steps

1. **Check Git Status**
	 - Ensure you are in the correct repository directory.
	 - Run:
		 ```sh
		 git status
		 ```
	 - Confirm there are changes to commit.

2. **Stage Changes**
	 - Stage all modified, new, or deleted files:
		 ```sh
		 git add .
		 ```
	 - Optionally, specify files individually if needed.

3. **Commit Changes**
	 - Commit with a descriptive message:
		 ```sh
		 git commit -m "<your commit message>"
		 ```
	 - If there are no staged changes, skip this step.

4. **Pull Latest Changes (Optional but Recommended)**
	 - To avoid conflicts, pull the latest changes from the remote branch:
		 ```sh
		 git pull --rebase
		 ```
	 - Resolve any merge conflicts if prompted.

5. **Push to Remote**
	 - Push your local commits to the remote repository:
		 ```sh
		 git push origin <branch-name>
		 ```
	 - Replace `<branch-name>` with your current branch (e.g., `main` or `master`).

6. **Verify Push**
	 - Confirm your changes are visible on the remote repository (e.g., GitHub, GitLab).

## Error Handling
- If you encounter authentication errors, ensure your credentials or SSH keys are set up correctly.
- For merge conflicts, resolve them locally, then repeat the commit and push steps.
- If the remote branch does not exist, create it with:
	```sh
	git push --set-upstream origin <branch-name>
	```

## Usage as Subagent
- This workflow can be invoked by automation tools or other agents to ensure a consistent Git push process.
- Customize commit messages and branch names as needed for your workflow.
