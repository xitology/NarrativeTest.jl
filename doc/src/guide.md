# Usage Guide


## Installation

You can install NarrativeTest using the Julia package manager:

```julia
julia> using Pkg
julia> Pkg.add("NarrativeTest")
```

To use NarrativeTest for testing your package, add it as [a test-specific
dependency](https://julialang.github.io/Pkg.jl/v1/creating-packages/#Adding-tests-to-the-package-1)
and create the following `test/runtests.jl` script in the package directory:

```julia
#!/usr/bin/env julia

using NarrativeTest
NarrativeTest.runtests()
```

Alternatively, if you are already using the standard `Test` library in
`test/runtests.jl`, you can run NarrativeTest-based tests as a nested test set:

```julia
using Test, NarrativeTest

@testset "MyPackage" begin
    …
    NarrativeTest.testset()
    …
end
```


## Creating tests

Write the test suite as a Markdown document and save it in the `test`
directory.  Place the test cases in Markdown code blocks, and use comments
`#-> …` and `#=> … =#` to indicate the expected output.  For example:

```markdown
# Sample test suite

Verify that the expression evaluates to the expected value:

    6(3+4)          #-> 42

Check if the code produces the expected output:

    print("Hello ")
    print("World!")
    #-> Hello World!

Abbreviate the output with ellipsis:

    collect('a':'z')
    #-> ['a', 'b', …, 'z']

    display(collect('a':'z'))
    #=>
    26-element Array{Char,1}:
     'a'
     'b'
     ⋮
     'z'
    =#

Run the test conditionally:

    #? Sys.WORD_SIZE == 64
    Int             #-> Int64
```

To suppress the printing of the value produced by the test case, end it with
`;`.

In the output block, you can use the symbol `…` (`\dots`) to match an arbitrary
sequence of characters in the line, and `⋮` (`\vdots`) to match any number of
lines.


## Running the tests

To run all test suites in the `test` directory, start:

```console
$ julia ./test/runtests.jl
Tests passed: 3
TESTING SUCCESSFUL!
```

You can also run individual test suites by listing them as command-line
parameters:

```console
$ julia ./test/runtests.jl path/to/test.md
```

Alternatively, you can run any test suite from Julia:

```julia
julia> using NarrativeTest
julia> success = NarrativeTest.runtests(["path/to/test.md"]);
Tests passed: 3
TESTING SUCCESSFUL!
julia> success
true
```
