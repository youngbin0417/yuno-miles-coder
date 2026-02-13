import ast, hashlib, json

def _hid(s: str) -> str:
    return "ID_" + hashlib.sha1(s.encode()).hexdigest()[:8]

class Extract(ast.NodeVisitor):
    def __init__(self):
        self.data = {"functions": [], "globals": [], "stats": {"loops": 0, "ifs": 0, "returns": 0}}

    def visit_FunctionDef(self, n: ast.FunctionDef):
        params = [_hid(a.arg) for a in n.args.args]
        self.data["functions"].append({
            "name": _hid(n.name),
            "params": params,
            "lineno": n.lineno
        })
        self.generic_visit(n)

    def visit_Assign(self, n: ast.Assign):
        for t in n.targets:
            if isinstance(t, ast.Name):
                self.data["globals"].append({"name": _hid(t.id), "lineno": n.lineno})
        self.generic_visit(n)

    def visit_For(self, n):    self.data["stats"]["loops"] += 1;   self.generic_visit(n)
    def visit_While(self, n):  self.data["stats"]["loops"] += 1;   self.generic_visit(n)
    def visit_If(self, n):     self.data["stats"]["ifs"] += 1;     self.generic_visit(n)
    def visit_Return(self, n): self.data["stats"]["returns"] += 1; self.generic_visit(n)

def extract_facts(py_code: str) -> str:
    tree = ast.parse(py_code)
    ex = Extract(); ex.visit(tree)
    return json.dumps(ex.data, ensure_ascii=False)
