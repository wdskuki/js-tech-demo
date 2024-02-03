fn main() {
    let y = {
        let x = 3;
        x + 1
    };
    // println!("{}", y);
    // println!("{}", add(1,2));

    assert_eq!(add(1,2), ());

}

fn add(x: i32, y: i32){
}