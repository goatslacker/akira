(function () {
var path, r, Access, Arguments, Assignment, Call, Compare, Construction, Declaration, Exception, Export, If, Identifier, Import, Literal, List, Nodes, Operation, Pattern, Pipeline, Tuple;
path = require('path');
r = function (m) {
    return require(path.join(__dirname, m.toLowerCase()));
};
this.Access = Access = r('access');
this.Arguments = Arguments = r('arguments');
this.Assignment = Assignment = r('assignment');
this.Call = Call = r('call');
this.Compare = Compare = r('compare');
this.Construction = Construction = r('construction');
this.Declaration = Declaration = r('declaration');
this.Exception = Exception = r('exception');
this.Export = Export = r('export');
this.If = If = r('if');
this.Identifier = Identifier = r('identifier');
this.Import = Import = r('import');
this.Literal = Literal = r('literal');
this.List = List = r('list');
this.Nodes = Nodes = r('nodes');
this.Operation = Operation = r('operation');
this.Pattern = Pattern = r('pattern');
this.Pipeline = Pipeline = r('pipeline');
this.Tuple = Tuple = r('tuple');
}.call(typeof module !== "undefined" ? module.exports : this))