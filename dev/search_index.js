var documenterSearchIndex = {"docs":
[{"location":"guide/#Usage-Guide","page":"Usage Guide","title":"Usage Guide","text":"","category":"section"},{"location":"guide/#Installation","page":"Usage Guide","title":"Installation","text":"","category":"section"},{"location":"guide/","page":"Usage Guide","title":"Usage Guide","text":"You can install NarrativeTest using the Julia package manager:","category":"page"},{"location":"guide/","page":"Usage Guide","title":"Usage Guide","text":"julia> using Pkg\njulia> Pkg.add(\"NarrativeTest\")","category":"page"},{"location":"guide/","page":"Usage Guide","title":"Usage Guide","text":"To use NarrativeTest for testing your package, add it as a test-specific dependency and create the following test/runtests.jl script in the package directory:","category":"page"},{"location":"guide/","page":"Usage Guide","title":"Usage Guide","text":"#!/usr/bin/env julia\n\nusing NarrativeTest\nNarrativeTest.runtests()","category":"page"},{"location":"guide/","page":"Usage Guide","title":"Usage Guide","text":"Alternatively, if you are already using the standard Test library in test/runtests.jl, you can run NarrativeTest-based tests as a nested test set:","category":"page"},{"location":"guide/","page":"Usage Guide","title":"Usage Guide","text":"using Test, NarrativeTest\n\n@testset \"MyPackage\" begin\n    …\n    NarrativeTest.testset()\n    …\nend","category":"page"},{"location":"guide/#Creating-tests","page":"Usage Guide","title":"Creating tests","text":"","category":"section"},{"location":"guide/","page":"Usage Guide","title":"Usage Guide","text":"Write the test suite as a Markdown document and save it in the test directory.  Place the test cases in Markdown code blocks, and use comments #-> … and #=> … =# to indicate the expected output.  For example:","category":"page"},{"location":"guide/","page":"Usage Guide","title":"Usage Guide","text":"# Sample test suite\n\nVerify that the expression evaluates to the expected value:\n\n    6(3+4)          #-> 42\n\nCheck if the code produces the expected output:\n\n    print(\"Hello \")\n    print(\"World!\")\n    #-> Hello World!\n\nAbbreviate the output with ellipsis:\n\n    collect('a':'z')\n    #-> ['a', 'b', …, 'z']\n\n    display(collect('a':'z'))\n    #=>\n    26-element Array{Char,1}:\n     'a'\n     'b'\n     ⋮\n     'z'\n    =#\n\nRun the test conditionally:\n\n    #? Sys.WORD_SIZE == 64\n    Int             #-> Int64","category":"page"},{"location":"guide/","page":"Usage Guide","title":"Usage Guide","text":"To suppress the printing of the value produced by the test case, end it with ;.","category":"page"},{"location":"guide/","page":"Usage Guide","title":"Usage Guide","text":"In the output block, you can use the symbol … (\\dots) to match an arbitrary sequence of characters in the line, and ⋮ (\\vdots) to match any number of lines.","category":"page"},{"location":"guide/#Running-the-tests","page":"Usage Guide","title":"Running the tests","text":"","category":"section"},{"location":"guide/","page":"Usage Guide","title":"Usage Guide","text":"To run all test suites in the test directory, start:","category":"page"},{"location":"guide/","page":"Usage Guide","title":"Usage Guide","text":"$ julia ./test/runtests.jl\nTests passed: 3\nTESTING SUCCESSFUL!","category":"page"},{"location":"guide/","page":"Usage Guide","title":"Usage Guide","text":"You can also run individual test suites by listing them as command-line parameters:","category":"page"},{"location":"guide/","page":"Usage Guide","title":"Usage Guide","text":"$ julia ./test/runtests.jl path/to/test.md","category":"page"},{"location":"guide/","page":"Usage Guide","title":"Usage Guide","text":"Alternatively, you can run any test suite from Julia:","category":"page"},{"location":"guide/","page":"Usage Guide","title":"Usage Guide","text":"julia> using NarrativeTest\njulia> success = NarrativeTest.runtests([\"path/to/test.md\"]);\nTests passed: 3\nTESTING SUCCESSFUL!\njulia> success\ntrue","category":"page"},{"location":"test/#Test-Suite","page":"Test Suite","title":"Test Suite","text":"","category":"section"},{"location":"test/","page":"Test Suite","title":"Test Suite","text":"This is the test suite for NarrativeTest.jl.  We start with importing its public API.","category":"page"},{"location":"test/","page":"Test Suite","title":"Test Suite","text":"using NarrativeTest","category":"page"},{"location":"test/#Running-the-tests","page":"Test Suite","title":"Running the tests","text":"","category":"section"},{"location":"test/","page":"Test Suite","title":"Test Suite","text":"The main entry point of NarrativeTest is the function runtests(), which takes a filename or a vector of filenames.  Each filename must refer to a Markdown document or a directory containing *.md files.  The files are parsed to extract and run the embedded test suite.","category":"page"},{"location":"test/","page":"Test Suite","title":"Test Suite","text":"ans = runtests([joinpath(@__DIR__, \"sample_good.md_\")]);\n#=>\nTests passed: 3\nTESTING SUCCESSFUL!\n=#","category":"page"},{"location":"test/","page":"Test Suite","title":"Test Suite","text":"If all tests pass, runtests() returns true.","category":"page"},{"location":"test/","page":"Test Suite","title":"Test Suite","text":"ans\n#-> true","category":"page"},{"location":"test/","page":"Test Suite","title":"Test Suite","text":"If any of the tests fail or an ill-formed test case is detected, runtests() reports the problem and returns false.","category":"page"},{"location":"test/","page":"Test Suite","title":"Test Suite","text":"ans = runtests([joinpath(@__DIR__, \"sample_bad.md_\")]);\n#=>\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\nTest failed at /…/sample_bad.md_, line 9:\n    2+2\nExpected output:\n    5\nActual output:\n    4\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\nTest failed at /…/sample_bad.md_, line 13:\n    sqrt(-1)\nExpected output:\n    0.0 + 1.0im\nActual output:\n    ERROR: DomainError …\n    sqrt will only return a complex result if called with a complex argument. …\n    Stacktrace:\n     ⋮\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\nError at /…/sample_bad.md_, line 17:\n    missing test code\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\nTests passed: 1\nTests failed: 2\nErrors: 1\nTESTING UNSUCCESSFUL!\n=#\n\nans\n#-> false","category":"page"},{"location":"test/","page":"Test Suite","title":"Test Suite","text":"To suppress any output except for error reports, specify parameter quiet=true.","category":"page"},{"location":"test/","page":"Test Suite","title":"Test Suite","text":"runtests(joinpath(@__DIR__, \"sample_good.md_\"), quiet=true)\n#-> true\n\nruntests(joinpath(@__DIR__, \"sample_bad.md_\"), quiet=true)\n#=>\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\nTest failed at /…/sample_bad.md_, line 9:\n⋮\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\nTest failed at /…/sample_bad.md_, line 13:\n⋮\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\nError at /…/sample_bad.md_, line 17:\n    missing test code\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\nfalse\n=#","category":"page"},{"location":"test/","page":"Test Suite","title":"Test Suite","text":"To implement the runtests.jl script, invoke runtests() without arguments. In this form, runtests() gets the list of files from command-line parameters and, after testing is done, terminates the process with an appropriate exit code.","category":"page"},{"location":"test/","page":"Test Suite","title":"Test Suite","text":"julia = Base.julia_cmd()\npwd = @__DIR__\n\nrun(`$julia -e 'using NarrativeTest; runtests()' $pwd/sample_good.md_`);\n#=>\n⋮\nTESTING SUCCESSFUL!\n=#\n\nrun(`$julia -e 'using NarrativeTest; runtests()' $pwd/sample_bad.md_`);\n#=>\n⋮\nTESTING UNSUCCESSFUL!\nERROR: failed process: Process(` … `, ProcessExited(1)) [1]\n=#","category":"page"},{"location":"test/","page":"Test Suite","title":"Test Suite","text":"Invoke the script with --help to get a brief help on available options.","category":"page"},{"location":"test/","page":"Test Suite","title":"Test Suite","text":"run(`$julia -e 'using NarrativeTest; runtests()' -- --help`);\n#=>\nUsage: runtests.jl [-q|--quiet] [FILE]...\n=#","category":"page"},{"location":"test/","page":"Test Suite","title":"Test Suite","text":"Add --quiet to suppress extra output.","category":"page"},{"location":"test/","page":"Test Suite","title":"Test Suite","text":"run(`$julia -e 'using NarrativeTest; runtests()' -- --quiet $pwd/sample_good.md_`);","category":"page"},{"location":"test/","page":"Test Suite","title":"Test Suite","text":"Use -- to separate options from regular parameters.","category":"page"},{"location":"test/","page":"Test Suite","title":"Test Suite","text":"run(`$julia -e 'using NarrativeTest; runtests()' -- --quiet -- --quiet`);\n#=>\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\nError at --quiet:\n    SystemError: …\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\nERROR: failed process: Process(` … `, ProcessExited(1)) [1]\n=#","category":"page"},{"location":"test/","page":"Test Suite","title":"Test Suite","text":"Any other option will result in an error.","category":"page"},{"location":"test/","page":"Test Suite","title":"Test Suite","text":"run(`$julia -e 'using NarrativeTest; runtests()' -- --error`);\n#=>\nruntests.jl: unrecognized option '--error'\nTry 'runtests.jl --help' for more information.\nERROR: failed process: Process(` … `, ProcessExited(2)) [2]\n=#","category":"page"},{"location":"test/#Using-with-Test-library","page":"Test Suite","title":"Using with Test library","text":"","category":"section"},{"location":"test/","page":"Test Suite","title":"Test Suite","text":"Function testset() makes NarrativeTest compatible with the standard Test library.","category":"page"},{"location":"test/","page":"Test Suite","title":"Test Suite","text":"using Test\n\nNarrativeTest.testset([joinpath(@__DIR__, \"sample_good.md_\"),\n                       joinpath(@__DIR__, \"sample_bad.md_\")])\n#=>\n⋮\nERROR: Some tests did not pass: 4 passed, 2 failed, 1 errored, 0 broken.\n=#","category":"page"},{"location":"test/","page":"Test Suite","title":"Test Suite","text":"Normally, it should be invoked from a test set.","category":"page"},{"location":"test/","page":"Test Suite","title":"Test Suite","text":"@testset begin\n    @test true == false\n    NarrativeTest.testset([joinpath(@__DIR__, \"sample_good.md_\"),\n                           joinpath(@__DIR__, \"sample_bad.md_\")])\n    @test 2 + 2 == 5\nend\n#=>\n⋮\nERROR: Some tests did not pass: 4 passed, 4 failed, 1 errored, 0 broken.\n=#","category":"page"},{"location":"test/#Extracting-test-cases","page":"Test Suite","title":"Extracting test cases","text":"","category":"section"},{"location":"test/","page":"Test Suite","title":"Test Suite","text":"We can extract individual test cases from Markdown and Julia files.  Let us import the respective API.","category":"page"},{"location":"test/","page":"Test Suite","title":"Test Suite","text":"using NarrativeTest:\n    parsejl,\n    parsemd","category":"page"},{"location":"test/","page":"Test Suite","title":"Test Suite","text":"Function parsemd() parses the given Markdown file and returns an array of the extracted test cases.","category":"page"},{"location":"test/","page":"Test Suite","title":"Test Suite","text":"suite = parsemd(joinpath(@__DIR__, \"sample_bad.md_\"))\nforeach(display, suite)\n#=>\nTest case at /…/sample_bad.md_, line 5:\n    (3+4)*6\nExpected output:\n    42\nTest case at /…/sample_bad.md_, line 9:\n    2+2\nExpected output:\n    5\nTest case at /…/sample_bad.md_, line 13:\n    sqrt(-1)\nExpected output:\n    0.0 + 1.0im\nError at /…/sample_bad.md_, line 17:\n    missing test code\n=#\n\nsuite = parsemd(\"sample_missing.md_\")\nforeach(display, suite)\n#=>\nError at sample_missing.md_:\n    SystemError: …\n=#","category":"page"},{"location":"test/","page":"Test Suite","title":"Test Suite","text":"Function parsemd() recognizes two types of Markdown code blocks: indented and fenced.","category":"page"},{"location":"test/","page":"Test Suite","title":"Test Suite","text":"suite = parsemd(\n    @__FILE__,\n    IOBuffer(\"\"\"\n        These test cases are embedded in an indented code block.\n\n            (3+4)*6\n            $(\"#->\") 42\n\n            2+2\n            $(\"#->\") 5\n\n        The following test cases are embedded in a fenced code block.\n        ```\n        print(2^16)\n        $(\"#->\") 65526\n\n        sqrt(-1)\n        $(\"#->\") 0.0 + 1.0im\n        ```\n        \"\"\"))\nforeach(display, suite)\n#=>\nTest case at /…/index.md, line 3:\n    (3+4)*6\nExpected output:\n    42\nTest case at /…/index.md, line 6:\n    2+2\nExpected output:\n    5\nTest case at /…/index.md, line 11:\n    print(2^16)\nExpected output:\n    65526\nTest case at /…/index.md, line 14:\n    sqrt(-1)\nExpected output:\n    0.0 + 1.0im\n=#","category":"page"},{"location":"test/","page":"Test Suite","title":"Test Suite","text":"A fenced code block with an explicit language indicator is ignored.","category":"page"},{"location":"test/","page":"Test Suite","title":"Test Suite","text":"parsemd(\n    @__FILE__,\n    IOBuffer(\"\"\"\n        The following code will not be tested.\n        ```julia\n        2 + 2   $(\"#->\") 5\n        ```\n        \"\"\"))\n#-> NarrativeTest.AbstractTestCase[]","category":"page"},{"location":"test/","page":"Test Suite","title":"Test Suite","text":"It is an error if a fenced code block is not closed.","category":"page"},{"location":"test/","page":"Test Suite","title":"Test Suite","text":"suite = parsemd(\n    @__FILE__,\n    IOBuffer(\"\"\"\n        Incomplete fenced code block is an error.\n        ```\n        (3+4)*6\n        $(\"#->\") 42\n        \"\"\"))\nforeach(display, suite)\n#=>\nError at /…/index.md, line 2:\n    incomplete fenced code block\n=#","category":"page"},{"location":"test/","page":"Test Suite","title":"Test Suite","text":"Function parsejl() parses a Julia file and returns an array of the extracted test cases.  It recognizes #? as a precondition and #-> … and #=> ⋮ =# as single-line and multi-line expected output.","category":"page"},{"location":"test/","page":"Test Suite","title":"Test Suite","text":"suite = parsejl(\n    @__FILE__,\n    IOBuffer(\"\"\"\n        2+2     $(\"#->\") 4\n\n        print(2^16)\n        $(\"#->\") 65526\n\n        display(collect('A':'Z'))\n        $(\"#=>\")\n        26-element Array{Char,1}:\n         'A'\n         'B'\n         ⋮\n         'Z'\n        =#\n\n        $(\"#?\") Sys.WORD_SIZE == 64\n\n        Int     $(\"#->\") Int64\n        \"\"\"))\nforeach(display, suite)\n#=>\nTest case at /…/index.md, line 1:\n    2+2\nExpected output:\n    4\nTest case at /…/index.md, line 3:\n    print(2^16)\nExpected output:\n    65526\nTest case at /…/index.md, line 6:\n    display(collect('A':'Z'))\nExpected output:\n    26-element Array{Char,1}:\n     'A'\n     'B'\n     ⋮\n     'Z'\nTest case at /…/index.md, line 15:\n    Int\nPrecondition:\n    Sys.WORD_SIZE == 64\nExpected output:\n    Int64\n=#","category":"page"},{"location":"test/","page":"Test Suite","title":"Test Suite","text":"A test case may have no expected output.","category":"page"},{"location":"test/","page":"Test Suite","title":"Test Suite","text":"suite = parsejl(\n    @__FILE__,\n    IOBuffer(\"\"\"\n        x = pi/6\n        y = sin(x)\n\n        @assert y ≈ 0.5\n        \"\"\"))\nforeach(display, suite)\n#=>\nTest case at /…/index.md, line 1:\n    x = pi/6\n    y = sin(x)\n\n    @assert y ≈ 0.5\n=#","category":"page"},{"location":"test/","page":"Test Suite","title":"Test Suite","text":"However, it is an error to have an expected output block without any test code.","category":"page"},{"location":"test/","page":"Test Suite","title":"Test Suite","text":"suite = parsejl(\n    @__FILE__,\n    IOBuffer(\"\"\"\n        $(\"#->\") 42\n        \"\"\"))\nforeach(display, suite)\n#=>\nError at /…/index.md, line 1:\n    missing test code\n=#","category":"page"},{"location":"test/","page":"Test Suite","title":"Test Suite","text":"It is also an error if a multi-line output block is not closed.","category":"page"},{"location":"test/","page":"Test Suite","title":"Test Suite","text":"suite = parsejl(\n    @__FILE__,\n    IOBuffer(\"\"\"\n        display(collect('A':'Z'))\n        $(\"#=>\")\n        26-element Array{Char,1}:\n         'A'\n         'B'\n         ⋮\n         'Z'\n        \"\"\"))\nforeach(display, suite)\n#=>\nError at /…/index.md, line 2:\n    incomplete multiline comment block\n=#","category":"page"},{"location":"test/#Running-one-test","page":"Test Suite","title":"Running one test","text":"","category":"section"},{"location":"test/","page":"Test Suite","title":"Test Suite","text":"We can run individual tests using the function runtest().","category":"page"},{"location":"test/","page":"Test Suite","title":"Test Suite","text":"using NarrativeTest:\n    runtest","category":"page"},{"location":"test/","page":"Test Suite","title":"Test Suite","text":"Function runtest() takes a test case object and returns the test result.","category":"page"},{"location":"test/","page":"Test Suite","title":"Test Suite","text":"suite = parsemd(joinpath(@__DIR__, \"sample_bad.md_\"))\nsuite = filter(t -> t isa NarrativeTest.TestCase, suite)\nresults = map(runtest, suite)\nforeach(display, results)\n#=>\nTest passed at /…/sample_bad.md_, line 5:\n    (3+4)*6\nExpected output:\n    42\nActual output:\n    42\nTest failed at /…/sample_bad.md_, line 9:\n    2+2\nExpected output:\n    5\nActual output:\n    4\nTest failed at /…/sample_bad.md_, line 13:\n    sqrt(-1)\nExpected output:\n    0.0 + 1.0im\nActual output:\n    ERROR: DomainError …:\n    …\n    Stacktrace:\n    ⋮\n=#","category":"page"},{"location":"test/","page":"Test Suite","title":"Test Suite","text":"runtest() captures the content of the standard output and error streams and matches it against the expected test result.","category":"page"},{"location":"test/","page":"Test Suite","title":"Test Suite","text":"result = runtest(@__FILE__, \"\"\"println(\"Hello World!\")\\n\"\"\", expect=\"Hello World!\\n\")\ndisplay(result)\n#=>\nTest passed at /…/index.md:\n    println(\"Hello World!\")\nExpected output:\n    Hello World!\nActual output:\n    Hello World!\n=#","category":"page"},{"location":"test/","page":"Test Suite","title":"Test Suite","text":"runtest() shows the value produced by the last statement of the test code.","category":"page"},{"location":"test/","page":"Test Suite","title":"Test Suite","text":"result = runtest(@__FILE__, \"(3+4)*6\\n\", expect=\"42\\n\")\ndisplay(result)\n#=>\nTest passed at /…/index.md:\n    (3+4)*6\nExpected output:\n    42\nActual output:\n    42\n=#\n\nresult = runtest(@__FILE__, \"2+2\\n\", expect=\"5\\n\")\ndisplay(result)\n#=>\nTest failed at /…/index.md:\n    2+2\nExpected output:\n    5\nActual output:\n    4\n=#","category":"page"},{"location":"test/","page":"Test Suite","title":"Test Suite","text":"However, if this value is equal to nothing, it is not displayed.","category":"page"},{"location":"test/","page":"Test Suite","title":"Test Suite","text":"result = runtest(@__FILE__, \"nothing\\n\", expect=\"\\n\")\ndisplay(result)\n#=>\nTest passed at /…/index.md:\n    ⋮\n=#","category":"page"},{"location":"test/","page":"Test Suite","title":"Test Suite","text":"This value is also concealed if the test code ends with ; or if the test case has no expected output.","category":"page"},{"location":"test/","page":"Test Suite","title":"Test Suite","text":"result = runtest(@__FILE__, \"(3+4)*6;\\n\", expect=\"\\n\")\ndisplay(result)\n#=>\nTest passed at /…/index.md:\n    ⋮\n=#\n\nresult = runtest(@__FILE__, \"(3+4)*6\\n\", expect=nothing)\ndisplay(result)\n#=>\nTest passed at /…/index.md:\n    ⋮\n=#","category":"page"},{"location":"test/","page":"Test Suite","title":"Test Suite","text":"A test case may include a precondition.  When the precondition is evaluated to false, the test case is skipped.","category":"page"},{"location":"test/","page":"Test Suite","title":"Test Suite","text":"result = runtest(@__FILE__, \"2+2\\n\", pre=\"0 < 1\\n\", expect=\"4\\n\")\ndisplay(result)\n#=>\nTest passed at /…/index.md:\n    2+2\nExpected output:\n    4\nActual output:\n    4\n=#\n\nresult = runtest(@__FILE__, \"2+2\\n\", pre=\"0 >= 1\\n\", expect=\"5\\n\")\ndisplay(result)\n#=>\nTest skipped at /…/index.md:\n    2+2\nFailed precondition:\n    0 >= 1\n=#","category":"page"},{"location":"test/","page":"Test Suite","title":"Test Suite","text":"The precondition must always produce a Boolean value.","category":"page"},{"location":"test/","page":"Test Suite","title":"Test Suite","text":"result = runtest(@__FILE__, \"2+2\\n\", pre=\"missing\\n\", expect=\"4\\n\")\ndisplay(result)\n#=>\nTest failed at /…/index.md:\n    2+2\nExpected output:\n    4\nActual output:\n    ERROR: TypeError: non-boolean (Missing) used in boolean context\n=#","category":"page"},{"location":"test/","page":"Test Suite","title":"Test Suite","text":"Functions include and eval are available in the test code.","category":"page"},{"location":"test/","page":"Test Suite","title":"Test Suite","text":"result = runtest(@__FILE__, \"include(\\\"included.jl\\\")\", expect=\"Hello from included.jl!\\n\")\ndisplay(result)\n#=>\nTest passed at /…/index.md:\n    include(\"included.jl\")\nExpected output:\n    Hello from included.jl!\nActual output:\n    Hello from included.jl!\n=#\n\nresult = runtest(@__FILE__, \"eval(:(print(\\\"Hello from eval!\\\")))\", expect=\"Hello from eval!\\n\")\ndisplay(result)\n#=>\nTest passed at /…/index.md:\n    eval(:(print(\"Hello from eval!\")))\nExpected output:\n    Hello from eval!\nActual output:\n    Hello from eval!\n=#","category":"page"},{"location":"test/","page":"Test Suite","title":"Test Suite","text":"Macros @__MODULE__, @__DIR__, @__FILE__, @__LINE__ properly report the location of the test code.","category":"page"},{"location":"test/","page":"Test Suite","title":"Test Suite","text":"result = runtest(@__FILE__, \"println(@__MODULE__)\", expect=string(@__MODULE__))\ndisplay(result)\n#=>\nTest passed at /…/index.md:\n    println(@__MODULE__)\nExpected output:\n    IndexMd\nActual output:\n    IndexMd\n=#\n\nresult = runtest(@__FILE__, \"println(@__DIR__)\", expect=@__DIR__)\ndisplay(result)\n#=>\nTest passed at /…/index.md:\n    println(@__DIR__)\nExpected output:\n    /…/test\nActual output:\n    /…/test\n=#\n\nresult = runtest(@__FILE__, \"println(@__FILE__)\", expect=@__FILE__)\ndisplay(result)\n#=>\nTest passed at /…/index.md:\n    println(@__FILE__)\nExpected output:\n    /…/index.md\nActual output:\n    /…/index.md\n=#\n\nresult = runtest(@__FILE__, \"println(@__LINE__)\", expect=\"1\")\ndisplay(result)\n#=>\nTest passed at /…/index.md:\n    println(@__LINE__)\nExpected output:\n    1\nActual output:\n    1\n=#","category":"page"},{"location":"test/","page":"Test Suite","title":"Test Suite","text":"When the test raises an exception, the error message (but not the stack trace) is included with the output.","category":"page"},{"location":"test/","page":"Test Suite","title":"Test Suite","text":"result = runtest(@__FILE__, \"sqrt(-1)\\n\", expect=\"ERROR: DomainError …\\n …\")\ndisplay(result)\n#=>\nTest passed at /…/index.md:\n    sqrt(-1)\nExpected output:\n    ERROR: DomainError …\n     …\nActual output:\n    ERROR: DomainError …\n    sqrt will only return a complex result if called with a complex argument. …\n=#","category":"page"},{"location":"test/","page":"Test Suite","title":"Test Suite","text":"In the expected output, we can use symbol … to match any number of characters in a line, and symbol ⋮ to match any number of lines.","category":"page"},{"location":"test/","page":"Test Suite","title":"Test Suite","text":"result = runtest(@__FILE__, \"print(collect('A':'Z'))\\n\", expect=\"['A', 'B', …, 'Z']\\n\")\ndisplay(result)\n#=>\nTest passed at /…/index.md:\n    print(collect('A':'Z'))\nExpected output:\n    ['A', 'B', …, 'Z']\nActual output:\n    ['A', 'B', 'C', …, 'Y', 'Z']\n=#\n\nresult = runtest(@__FILE__, \"foreach(println, 'A':'Z')\\n\", expect=\"A\\nB\\n⋮\\nZ\\n\")\ndisplay(result)\n#=>\nTest passed at /…/index.md:\n    foreach(println, 'A':'Z')\nExpected output:\n    A\n    B\n    ⋮\n    Z\nActual output:\n    A\n    B\n    ⋮\n    Z\n=#","category":"page"},{"location":"test/","page":"Test Suite","title":"Test Suite","text":"A test case can be executed in the context of a specific module.","category":"page"},{"location":"test/","page":"Test Suite","title":"Test Suite","text":"runtest(@__FILE__, \"hello = \\\"Hello World!\\\"\", mod=Main)\n\nMain.hello\n#-> \"Hello World!\"","category":"page"},{"location":"reference/#API-Reference","page":"API Reference","title":"API Reference","text":"","category":"section"},{"location":"reference/","page":"API Reference","title":"API Reference","text":"NarrativeTest.runtests\nNarrativeTest.testset\nNarrativeTest.runtest\nNarrativeTest.parsemd\nNarrativeTest.parsejl\nNarrativeTest.common_args\nNarrativeTest.common_subs","category":"page"},{"location":"reference/#NarrativeTest.runtests","page":"API Reference","title":"NarrativeTest.runtests","text":"runtests(files; subs=common_subs(), mod=nothing, quiet=false) :: Bool\n\nLoad the specified Markdown files to extract and run the embedded test cases. When a directory is passed, load all *.md files in the directory.  This function returns true if the testing is successful, false otherwise.\n\nSpecify subs to customize substitutions applied to the expected output in order to convert it to a regular expression.\n\nSpecify mod to execute tests in the context of the given module.\n\nSet quiet=true to suppress all output except for error reports.\n\nruntests(; default=common_args(), subs=common_subs(), mod=nothing, quiet=false)\n\nIn this form, test files are specified as command-line parameters.  When invoked without parameters, tests are loaded from *.md files in the program directory, which can be overriden using default parameter.  This function terminates the program with code 0 if the testing is successful, 1 otherwise.\n\nUse this form in test/runtests.jl:\n\nusing NarrativeTest\nNarrativeTest.runtests()\n\n\n\n\n\n","category":"function"},{"location":"reference/#NarrativeTest.testset","page":"API Reference","title":"NarrativeTest.testset","text":"testset(files = nothing;\n        default=common_args(), subs=common_subs(), mod=nothing, quiet=false)\n\nRun NarrativeTest-based tests as a nested test set.  For example, invoke it in test/runtests.jl:\n\nusing Test, NarrativeTest\n\n@testset \"MyPackage\" begin\n    …\n    NarrativeTest.testset()\n    …\nend\n\nThe given Markdown files are analyized to extract and run the embedded test cases.  When a directory is passed, all nested *.md files are loaded.  When invoked without arguments, all *.md files in the program directory are loaded, which can be overridden using the default parameter.\n\nSpecify subs to customize substitutions applied to the expected output in order to convert it to a regular expression.\n\nSpecify mod to execute tests in the context of the given module.\n\nSet quiet=true to suppress all output except for error reports.\n\n\n\n\n\n","category":"function"},{"location":"reference/#NarrativeTest.runtest","page":"API Reference","title":"NarrativeTest.runtest","text":"runtest(test::TestCase; subs=common_subs(), mod=nothing) :: AbstractResult\nruntest(loc, code; pre=nothing, expect=nothing, subs=common_subs(), mod=nothing) :: AbstractResult\n\nRun the given test case, return the result.\n\n\n\n\n\n","category":"function"},{"location":"reference/#NarrativeTest.parsemd","page":"API Reference","title":"NarrativeTest.parsemd","text":"parsemd(file) :: Vector{AbstractTestCase}\nparsemd(name, io) :: Vector{AbstractTestCase}\n\nParse the specified Markdown file to extract the embedded test suite; return a list of test cases.\n\n\n\n\n\n","category":"function"},{"location":"reference/#NarrativeTest.parsejl","page":"API Reference","title":"NarrativeTest.parsejl","text":"parsejl(file) :: Vector{AbstractTestCase}\nparsejl(name, io) :: Vector{AbstractTestCase}\n\nLoad the specified Julia source file and extract the embedded test suite; return a list of test cases.\n\n\n\n\n\n","category":"function"},{"location":"reference/#NarrativeTest.common_args","page":"API Reference","title":"NarrativeTest.common_args","text":"common_args() :: Vector{String}\n\nDefault test files for use when the test runner has no arguments.\n\n\n\n\n\n","category":"function"},{"location":"reference/#NarrativeTest.common_subs","page":"API Reference","title":"NarrativeTest.common_subs","text":"common_subs() :: Vector{Pair{Regex,SubstitutionString{String}}}\n\nSubstitutions applied to the expected output in order to convert it to a regular expression.\n\n\n\n\n\n","category":"function"},{"location":"#NarrativeTest.jl-Documentation","page":"Home","title":"NarrativeTest.jl Documentation","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"NarrativeTest is a Julia library for functional testing, which lets you write the test suite in the narrative form.  It permits you to describe the behavior of software components in the Markdown format, and then extract, execute, and validate any embedded test code.","category":"page"},{"location":"","page":"Home","title":"Home","text":"NarrativeTest can be compared to the Doctest module (see also Documenter.jl). It differs from Doctest in its approach to syntax: instead of presenting the test suite as a part of an interactive session, NarrativeTest uses plain code blocks with expected output in comments.  It also focuses less on docstrings and documentation examples, and more on validating the ergonomics of API with \"literate testing\".","category":"page"},{"location":"#Contents","page":"Home","title":"Contents","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Pages = [\n    \"guide.md\",\n    \"reference.md\",\n    \"test.md\",\n]","category":"page"},{"location":"#Index","page":"Home","title":"Index","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"","category":"page"}]
}
