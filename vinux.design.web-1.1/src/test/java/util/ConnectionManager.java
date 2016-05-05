package util;

import java.sql.DriverManager;
import java.sql.SQLException;

import com.mysql.jdbc.Connection;


public class ConnectionManager {
	private static Connection connection = null;
	private static final String URL = "jdbc:mysql://192.168.0.145:3306/vinux_goods?useUnicode=true&characterEncoding=UTF-8";
	private static final String USER = "root";
	private static final String PASSWORD = "vinux";
	
	static {
		try {
			Class.forName("com.mysql.jdbc.Driver");
		} catch (ClassNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	}
	
	public static Connection getConnection() throws SQLException {
		return (Connection) DriverManager.getConnection(URL, USER, PASSWORD);
	}
	
	public static synchronized Connection getInstance() throws SQLException {
		if (null == connection)
		  connection = getConnection();
		return connection;
	}
}
