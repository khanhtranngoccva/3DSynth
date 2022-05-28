function timeIt(callback) {
    const t1 = performance.now();
    const result = callback();
    const t2 = performance.now();
    console.log("Time taken:", t2 - t1, "ms")
}


export default timeIt;