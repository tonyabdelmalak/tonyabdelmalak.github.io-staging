(function() {
  async function getJSON(url) {
    const resp = await fetch(url, { cache: "no-store" });
    return resp.ok ? resp.json() : null;
  }

  function createEl(tag, className) {
    const el = document.createElement(tag);
    if (className) el.className = className;
    return el;
  }

  function ChatWidget(config, persona) {
    this.conf = config || {};
    this.persona = persona;
    if (persona) {
      this.SYSTEM_PROMPT = 'You are Tony speaking in first person. Use the following details to answer as Tony: ' + JSON.stringify(persona);
    } else {
      this.SYSTEM_PROMPT = 'You are Tony speaking in first person.';
    }
    this.init();
  }

  ChatWidget.prototype.init = function() {
    this.launcher = createEl('div', 'tcw-launcher');
    this.launcher.textContent = '💬';
    document.body.appendChild(this.launcher);

    this.panel = createEl('div', 'tcw-panel');
    document.body.appendChild(this.panel);

    this.messagesDiv = createEl('div', 'tcw-messages');
    this.panel.appendChild(this.messagesDiv);

    var inputBar = createEl('div', 'tcw-inputbar');
    this.textarea = createEl('textarea');
    this.textarea.rows = 1;
    var sendBtn = createEl('button');
    sendBtn.textContent = 'Send';
    inputBar.appendChild(this.textarea);
    inputBar.appendChild(sendBtn);
    this.panel.appendChild(inputBar);

    var greetKey = 'tcw_greeted';
    if (this.conf.intro_once && !sessionStorage.getItem(greetKey) && this.conf.firstMessage) {
      this.addMsg('Tony', this.conf.firstMessage);
      sessionStorage.setItem(greetKey, '1');
    }

    this.launcher.addEventListener('click', () => {
      var showing = this.panel.style.display === 'block';
      this.panel.style.display = showing ? 'none' : 'block';
    });

    sendBtn.addEventListener('click', () => this.sendMessage());
    this.textarea.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        this.sendMessage();
      }
    });
  };

  ChatWidget.prototype.addMsg = function(sender, text) {
    var row = createEl('div', 'tcw-msg');
    row.innerHTML = '<strong>' + sender + ':</strong> ' + text;
    this.messagesDiv.appendChild(row);
    this.messagesDiv.scrollTop = this.messagesDiv.scrollHeight;
  };

  ChatWidget.prototype.collectHistory = function() {
    var msgs = [];
    var rows = this.messagesDiv.querySelectorAll('.tcw-msg');
    rows.forEach(function(r) {
      var txt = r.textContent;
      if (txt.startsWith('You:')) {
        msgs.push({ role: 'user', content: txt.slice(4).trim() });
      } else if (txt.startsWith('Tony:')) {
        msgs.push({ role: 'assistant', content: txt.slice(5).trim() });
      }
    });
    return msgs;
  };

  ChatWidget.prototype.sendMessage = function() {
    var msg = this.textarea.value.trim();
    if (!msg) return;
    this.addMsg('You', msg);
    this.textarea.value = '';

    var history = this.collectHistory();
    var messages = [];
    messages.push({ role: 'system', content: this.SYSTEM_PROMPT });
    history.forEach(function(m) { messages.push(m); });
    messages.push({ role: 'user', content: msg });

    var self = this;
    fetch(this.conf.proxyUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: messages, model: this.conf.model })
  (function() {
  async function getJSON(url) {
    const resp = await fetch(url, { cache: "no-store" });
    return resp.ok ? resp.json() : null;
  }

  function createEl(tag, className) {
    const el = document.createElement(tag);
    if (className) el.className = className;
    return el;
  }

  function ChatWidget(config, persona) {
    this.conf = config || {};
    this.persona = persona;
    if (persona) {
      this.SYSTEM_PROMPT = 'You are Tony speaking in first person. Use the following details to answer as Tony: ' + JSON.stringify(persona);
    } else {
      this.SYSTEM_PROMPT = 'You are Tony speaking in first person.';
    }
    this.init();
  }

  ChatWidget.prototype.init = function() {
    this.launcher = createEl('div', 'tcw-launcher');
    this.launcher.textContent = '💬';
    document.body.appendChild(this.launcher);

    this.panel = createEl('div', 'tcw-panel');
    document.body.appendChild(this.panel);

    this.messagesDiv = createEl('div', 'tcw-messages');
    this.panel.appendChild(this.messagesDiv);

    var inputBar = createEl('div', 'tcw-inputbar');
    this.textarea = createEl('textarea');
    this.textarea.rows = 1;
    var sendBtn = createEl('button');
    sendBtn.textContent = 'Send';
    inputBar.appendChild(this.textarea);
    inputBar.appendChild(sendBtn);
    this.panel.appendChild(inputBar);

    var greetKey = 'tcw_greeted';
    if (this.conf.intro_once && !sessionStorage.getItem(greetKey) && this.conf.firstMessage) {
      this.addMsg('Tony', this.conf.firstMessage);
      sessionStorage.setItem(greetKey, '1');
    }

    this.launcher.addEventListener('click', () => {
      var showing = this.panel.style.display === 'block';
      this.panel.style.display = showing ? 'none' : 'block';
    });

    sendBtn.addEventListener('click', () => this.sendMessage());
    this.textarea.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        this.sendMessage();
      }
    });
  };

  ChatWidget.prototype.addMsg = function(sender, text) {
    var row = createEl('div', 'tcw-msg');
    row.innerHTML = '<strong>' + sender + ':</strong> ' + text;
    this.messagesDiv.appendChild(row);
    this.messagesDiv.scrollTop = this.messagesDiv.scrollHeight;
  };

  ChatWidget.prototype.collectHistory = function() {
    var msgs = [];
    var rows = this.messagesDiv.querySelectorAll('.tcw-msg');
    rows.forEach(function(r) {
      var txt = r.textContent;
      if (txt.startsWith('You:')) {
        msgs.push({ role: 'user', content: txt.slice(4).trim() });
      } else if (txt.startsWith('Tony:')) {
        msgs.push({ role: 'assistant', content: txt.slice(5).trim() });
      }
    });
    return msgs;
  };

  ChatWidget.prototype.sendMessage = function() {
    var msg = this.textarea.value.trim();
    if (!msg) return;
    this.addMsg('You', msg);
    this.textarea.value = '';

    var history = this.collectHistory();
    var messages = [];
    messages.push({ role: 'system', content: this.SYSTEM_PROMPT });
    history.forEach(function(m) { messages.push(m); });
    messages.push({ role: 'user', content: msg });

    var self = this;
    fetch(this.conf.proxyUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: messages, model: this.conf.model })
    })
      .then(function(r) { return r.json(); })
      .then(function(data) {
        var reply = '';
        if (data && data.choices && data.choices[0] && data.choices[0].message) {
          reply = data.choices[0].message.content;
        } else if (data && data.reply) {
          reply = data.reply;
        } else if (data && data.message) {
          reply = data.message;
        }
        self.addMsg('Tony', reply || 'Sorry, there was an error.');
      })
      .catch(function() {
        self.addMsg('Tony', 'Sorry, there was an error.');
      });
  };

  window.TonyChatWidget = {
    init: async function(opts) {
      var configPath = (opts && opts.configPath) || '/assets/chat/config.json';
      var conf = await getJSON(configPath) || {};
      var persona = null;
      try {
        persona = await getJSON('/assets/chat/persona.json');
      } catch (e) {}
      new ChatWidget(conf, persona);
    }
  };
})();  })
      .then(function(r) { return r.json(); })
      .then(function(data) {
        var reply = '';
        if (data && data.choices && data.choices[0] && data.choices[0].message) {
          reply = data.choices[0].message.content;
        } else if (data && data.reply) {
          reply = data.reply;
        } else if (data && data.message) {
          reply = data.message;
        }
        self.addMsg('Tony', reply || 'Sorry, there was an error.');
      })
      .catch(function() {
        self.addMsg('Tony', 'Sorry, there was an error.');
      });
  };

  window.TonyChatWidget = {
    init: async function(opts) {
      var configPath = (opts && opts.configPath) || '/assets/chat/config.json';
      var conf = await getJSON(configPath) || {};
      var persona = null;
      try {
        persona = await getJSON('/assets/chat/persona.json');
      } catch (e) {}
      new ChatWidget(conf, persona);
    }
  };
})();
