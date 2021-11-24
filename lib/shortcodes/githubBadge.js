module.exports = (repo, label = 'View on GitHub') =>
    `<div class="github__badge"><a href="https://github.com/${repo}" alt="${label}" target="_blank"><div class="logo"><i class="icon icon-github"></i></div><div class="label">${label}</div></a></div>`
