Microsite Template
==================

A starter repo for building microsites.


Getting started
---------------

Make a shallow copy of this repo, name it whatever you want:

    git clone --depth 1 https://github.com/chadoh/microsite-template.git my-cool-site

Change into the directory and remove the `.git` folder:

    cd my-cool-site && rm -rf .git

Update `package.json` with correct info. "author" and "repository" and all of
that is initially blank.

Initialize it as your own git repository.

    git init
    git add .
    git commit -m "Initial commit: copy from chadoh/microsite-template"

Install all development dependencies:

    npm i -D \@types/jest html-inline husky jest parcel-bundler posthtml-include sass ts-jest typescript

Run local development environment:

    npm run dev

Happy hacking!


Build & Deploy
--------------

The production version of this site lives in `docs/index.html`. This file is
**generated automatically** when you run `npm run build`, and should not be
edited. Only edit the files in `src`.

If you go to your Repo settings in GitHub, you can set up repo as a GitHub
Pages repo, using files from `master` branch and the `docs` folder.






















# Open Enterprise DAO Stats

Stats about Aragon organizations deployed using Autark's Open Enterprise template

## Desired UI

UI: input an etherscan URL to the open enterprise template contract, and output a report…

E.g. the contract can be https://etherscan.io/address/0xc54c5db63ab0e79fbb9555373b969093deb17859

For the following time periods...

* Inception to date
* Per week stats - Sunday at 00:00 to Saturday at 11:59:59 UTC-
* Last 4 weeks

Display this data:

* DAOs created successfully
* Failed DAO creations
* Total attempts (failed+success)
* Failure rate (#failed/#total)


For each DAO, display a table that looks like: https://apiary.1hive.org/orgs - with an additional columns of:

* Status (failed / successful) - maybe some in between status for 1 successful + 1 failed txn
* Creator ethereum address (hyperlink to etherscan)


### How to define what a failure is

* Successful DAO creations is detected by two transactions from the same address, usually occurring within a short time span
* A failure is usually detected if there is a lone transaction that isn’t related to any other transaction
* Sometimes the failure can occur in the first transaction, other times user has a successful first transaction and the 2nd transaction fails


## How to build it

* use hard-coded contract address `0xc54c5db63ab0e79fbb9555373b969093deb17859`
* use manually-saved abi at abi.json
* use similar logic to https://github.com/AutarkLabs/open-enterprise/blob/dev/templates/open-enterprise/scripts/recover-dao.js
  * query for all transactions against contract
  * use abi to decode input data
  * input data for first transaction (maybe second??) will contain name of aragon organization, for generating table and links
