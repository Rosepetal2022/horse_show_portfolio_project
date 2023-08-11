- Now that the feature is done, go back to the "INDIVIDUAL GIT WORK CYCLE" section to start your new feature on your own dev-branch.

# Overview

This guide is intended for the students in CS 340 who want to take a path through the class using React and Node.

This guide walks through everything from getting the tools setup to work on the app, setting up the infrastructure required to build and run your app, and building and (eventually) deploying the app either to OSU's flip server or Heroku.

There are a few assumptions that are made when this guide is written:

- You have basic familiarity with Javascript and MySQL syntax
- You are capable of opening a terminal and navigating using basic commands like\*\* **`cd`,** \*\*`ls`, etc.
- You have access to OSU's flip servers, and have been issued a MySQL database in class.
  - This guide can be easily adapted for development on your local machine if you are so inclined.

## Contributions

Dr. Curry and Prof. Safonte for allowing me the time to build the guide and project for other students to benefit from.

## Clone and Go

You can clone the entire repository to a directory on your Flip Server account. The how-to is broken up into separate folders, complete with code and their own README.txt allowing you hit the ground running.

Whenever the Step requires database interactivity, you will need to load your own credentials in\*_ **`database/db-connector.js` for that Step. You'll note for each step, the login, database and password are set to** \*\*`'_'`.

# Table of Contents

- [Overview](https://github.com/osu-cs340-ecampus/nodejs-starter-app/blob/main/README.md#overview)
  - [Contributions](https://github.com/osu-cs340-ecampus/nodejs-starter-app/blob/main/README.md#contributions)
  - [Clone and Go](https://github.com/osu-cs340-ecampus/nodejs-starter-app/blob/main/README.md#clone-and-go)
- [Table of Contents](https://github.com/osu-cs340-ecampus/nodejs-starter-app/blob/main/README.md#table-of-contents)
- [Get The Tools Downloaded You Will Need](https://github.com/osu-cs340-ecampus/nodejs-starter-app/blob/main/README.md#step-1---get-the-tools-downloaded-you-will-need)
  - [Text Editior](https://github.com/osu-cs340-ecampus/nodejs-starter-app/blob/main/README.md#text-editior)
  - [Browser](https://github.com/osu-cs340-ecampus/nodejs-starter-app/blob/main/README.md#browser)
  - [Terminal Application](https://github.com/osu-cs340-ecampus/nodejs-starter-app/blob/main/README.md#terminal-application)
  - [Git](https://github.com/osu-cs340-ecampus/nodejs-starter-app/blob/main/README.md#git)
    - [Create a .gitignore File](https://github.com/osu-cs340-ecampus/nodejs-starter-app/blob/main/README.md#create-a-.gitignore-file)
  - [More on Git](https://github.com/osu-cs340-ecampus/nodejs-starter-app/blob/main/README.md#more-on-git)

# Get The Tools Downloaded You Will Need

You are going to need a few things get going here.

## Text Editior

Text Editors are like clothes. Everyone has their preferences. I prefer VS Code so this guide will be built using that editor. You can use what you please. Atom, Sublime, Notepad, Vim, eMacs or even Notepad are completely acceptable. We just need to be able to edit our code.

## Browser

Chrome will be used as the browser of choice, but you are free to use what you are most comforatble with. Just be sure you know how to navigate the developer tools.

Mac crowd: Safari** \***usually\* is fine. If you have issues though, I would recommend switching to Firefox or Chrome. Safari has some quirks when it comes to rendering CSS, though admittedly over the past few years it has gotten better.

## Terminal Application

You will need some way to interface with the Flip Server and SSH into it. My preferred method is to use VS Code to directly connect to the Flip. Once connected, I can open a VS Code terminal and enter the native linux commands there. As long as you can SSH into a Flip, enter commands, you are all set.

You may prefer Putty or xterm or iTerm (mac). Those are fine, you should be capable of establishing an SSH session to the flip server using whatever tool you choose. Mac users, can use their built in terminal.

Windows 10 users, I'll take this opportunity to make the suggestion of considering installing the Windows Subsystem for Linux 2. It let's you run a native Linux installation right on top of Windows 10. I learned how to install it and use back when I first started the program in Fall 2019. I'll never go back.

[Learn How To Install WSL2 on Windows 10](https://docs.microsoft.com/en-us/windows/wsl/install-win10)

## Git

I strongly believe in using Version Control. Why?

- It keeps a record of your work.
- It allows you to go back to an older state of the project if you made a mistake.
- You can push it to a Private or Public GitHub repository (always assume Private unless you check with your instructor first)
- It makes working on the same project on different computers a breeze.
- It can support your case if you are ever scrutinized for academic dishonesty. (Having a paper trail of commits you can show the school)
- If your computer fails, your data is not lost.
- It integrates quite easily with other third party services such as Heroku.

This is a Portfolio Project. It will be yours to demo to prospective employers or show of to friends and family. Log in to GitHub, make a new repo, check the option to create a README.md file, and create!

In GitHub, when you are on your repo's homepage, you will see a green button that says code, click it and then ensure you copy your appropriate repo link.

> You might notice the options HTTPS, SSH and GitHub CLI above the text. Most users will want to use HTTPS. This will prompt you for a UserName and Password when pushing to the repo. If you don't want to do that every single time, I highly recommend learning how to interface with GitHub using SSH. It only takes a few minutes, and the upside is, you never have to type in your Username and Password. It's how I do it and I've never looked back.
>
> Here is a link for those interested:\*\* \*\*[Connecting to GitHub with SSH](https://docs.github.com/en/free-pro-team@latest/github/authenticating-to-github/connecting-to-github-with-ssh)

[![Github Code Button](https://github.com/osu-cs340-ecampus/nodejs-starter-app/raw/main/assets/github_code_button.png)](https://github.com/osu-cs340-ecampus/nodejs-starter-app/blob/main/assets/github_code_button.png)[![Github Copy Repo Button](https://github.com/osu-cs340-ecampus/nodejs-starter-app/raw/main/assets/github_copy_repo_link.png)](https://github.com/osu-cs340-ecampus/nodejs-starter-app/blob/main/assets/github_copy_repo_link.png)

Once you have created a new repo and got your link, fire up your terminal. Navigate to a place where you want to clone your repo to. Cloning creates a new folder (named the same as the repo) so no need to create a new folder just to clone it to. Enter the following command:

```shell
git clone <link_you_copied_from_GitHub>
```

You can then check to see that the clone was successful by typing the following command in your terminal.

```shell
ls
```

You should see whatever was in the folder before AND a new folder with the same name as your repo.

[![ls command after cloning](https://github.com/osu-cs340-ecampus/nodejs-starter-app/raw/main/assets/github_post_clone_ls.png)](https://github.com/osu-cs340-ecampus/nodejs-starter-app/blob/main/assets/github_post_clone_ls.png)

You can now navigate to the folder by:

`cd <name_of_your_new_folder>`

You will now be in your new folder created by cloning the repo.** \*\***This would be the root of your new project.\*\*

[![cd to new repo created by git clone](https://github.com/osu-cs340-ecampus/nodejs-starter-app/raw/main/assets/github_post_clone_cd.png)](https://github.com/osu-cs340-ecampus/nodejs-starter-app/blob/main/assets/github_post_clone_cd.png)

> Your terminal prompt is likely to look a bit different than what you see in these images. I have customized mine. The commands on your terminal will still yield the same output, they just might be different colors or fonts.

> This example provides pictures that have an already populated database. You will only see a README.md file in your project.

### Create a .gitignore File

There are going to be certain things we don't want to submit to our repo, such as credentials, the\*\* \*\*`/node_modules/` folder, etc.

Create a file called\*\* \*\*`.gitignore` in the root of your directory.

You can add individual paths, files and folders on a line by line basis in this file. Git will ignore each of those paths, files or folders when keeping track of your repo. For VS Code users, there is almost always a folder called\*\* **`.vscode` that gets created in your project root. We will also be using Node Package Manager which will create a gargantuan folder called** \*\*`node_modules`, which we don't want to keep in the repo. You can add the lines:

```shell
/.vscode
/node_modules
```
