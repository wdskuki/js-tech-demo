fn add<T: std::ops::Add<Output = T>>(a:T, b:T) -> T {
    a + b
}

fn main() {
    println!("add i8: {}", add(2i8, 3i8));
    // println!("add i32: {}", add(20, 30));
    // println!("add f64: {}", add(1.23, 1.23));
}