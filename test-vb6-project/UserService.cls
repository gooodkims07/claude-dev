VERSION 1.0 CLASS
BEGIN
  MultiUse = -1  'True
  Persistable = 0  'NotPersistable
  DataBindingBehavior = 0  'vbNone
  DataSourceBehavior  = 0  'vbNone
  MTSTransactionMode  = 0  'NotAnMTSObject
END
Attribute VB_Name = "UserService"
Attribute VB_GlobalNameSpace = False
Attribute VB_Creatable = True
Attribute VB_PredeclaredId = False
Attribute VB_Exposed = False
Private mUserID As String
Private mUserName As String
Private mEmail As String
Private mLastLogin As Date

Public Property Get UserID() As String
    UserID = mUserID
End Property

Public Property Let UserID(ByVal vNewValue As String)
    mUserID = vNewValue
End Property

Public Property Get UserName() As String
    UserName = mUserName
End Property

Public Property Let UserName(ByVal vNewValue As String)
    mUserName = vNewValue
End Property

Public Property Get Email() As String
    Email = mEmail
End Property

Public Property Let Email(ByVal vNewValue As String)
    mEmail = vNewValue
End Property

Public Function ValidateUser(userId As String, password As String) As Boolean
    Dim dbUtil As New DBUtil
    Dim rs As ADODB.Recordset
    Dim sql As String

    sql = "SELECT * FROM T_USER WHERE USER_ID = '" & userId & "' AND PASSWORD = '" & password & "' AND USE_YN = 'Y'"

    Set rs = dbUtil.ExecuteQuery(sql)

    If Not rs.EOF Then
        mUserID = rs!USER_ID
        mUserName = rs!USER_NAME
        mEmail = rs!EMAIL
        mLastLogin = rs!LAST_LOGIN

        ' 마지막 로그인 시간 업데이트
        UpdateLastLogin userId

        ValidateUser = True
    Else
        ValidateUser = False
    End If

    rs.Close
    Set rs = Nothing
End Function

Private Sub UpdateLastLogin(userId As String)
    Dim dbUtil As New DBUtil
    Dim sql As String

    sql = "UPDATE T_USER SET LAST_LOGIN = SYSDATE WHERE USER_ID = '" & userId & "'"
    dbUtil.ExecuteNonQuery sql
End Sub

Public Function GetUserList(deptCode As String) As ADODB.Recordset
    Dim dbUtil As New DBUtil
    Dim sql As String

    sql = "SELECT U.USER_ID, U.USER_NAME, U.EMAIL, D.DEPT_NAME " & _
          "FROM T_USER U INNER JOIN T_DEPT D ON U.DEPT_CODE = D.DEPT_CODE " & _
          "WHERE U.DEPT_CODE = '" & deptCode & "' " & _
          "AND U.USE_YN = 'Y' " & _
          "ORDER BY U.USER_NAME"

    Set GetUserList = dbUtil.ExecuteQuery(sql)
End Function
