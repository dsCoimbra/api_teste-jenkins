let lastIndexPipe = 0
    let currentRules = ''
    
    exports.errors = []
    
    exports.validator = (rules, params) => {
      let errors = [];
      Object.entries(rules).forEach(rule => {
        let field = rule[0]
        let value = params[field];
        let rules = rule[1]
        this.lastIndexPipe = rules.indexOf('|');
        this.currentRules = rules;
        this.resolveRules({field, value})
        if(this.errors.length)
          errors.push({field, errors: this.errors})
        this.errors = []
      })
      if(errors.length)
        throw errors
      return true
    };
    
    exports.resolveRules = (data) => {
        let rule = ''
      if(this.lastIndexPipe == false) {
        return this.errors
      } 
      else {
        this.lastIndexPipe = this.currentRules.indexOf('|');
        rule = this.currentRules.substr(0, this.lastIndexPipe)
        if (this.lastIndexPipe == -1) {
          this.lastIndexPipe = false
          rule = this.currentRules
        }
        this.currentRules  = this.currentRules.substr(this.lastIndexPipe +1, this.currentRules.length)
      }
      let validate = this[rule](data);
      if (validate != true) 
        this.errors.push(validate);
      this.resolveRules(data)
    };
    
    
    
    exports.required = (data) => {
        return data.value != undefined ? true : `O campo ${data.field} é obrigatório`;
    };
    exports.string = (data) => {
        return typeof data.value == 'string' ? true : `O campo ${data.field} precisa ser uma string`;
    };
    exports.integer = (data) => {
        return typeof data.value == 'number' ? true : `O campo ${data.field} precisa ser um inteiro`;
    }
    exports.char = (data) => {
        return data.value.length > 1 ? `Maximum length of 1 character in the ${data.field} field.` : true
    }
      